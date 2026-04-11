require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined.');
    process.exit(1);
}

const app = express();
const port = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet({
    contentSecurityPolicy: false, // Set to false if you experience issues with loaded fonts/images in production
}));
app.use(cors());
app.use(express.json());

// Performance & Logging
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error('FATAL ERROR: MONGO_URI is not defined.');
    process.exit(1);
}

mongoose.connect(mongoURI, { family: 4 })
    .then(() => console.log('MongoDB connection established successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Auth Middleware
const authUser = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
        
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Admin verification middleware
const authAdmin = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
        
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin privileges required' });
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// API Routes
app.get('/api/makeadmin/:email', async (req, res) => {
    try {
       const user = await User.findOneAndUpdate({ email: req.params.email }, { role: 'admin' }, { new: true });
       if (!user) return res.status(404).json({ message: 'User not found' });
       res.json({ message: `${user.email} is now an admin! Please relogin.` });
    } catch (err) {
       res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ 
            message: 'Error logging in', 
            error: process.env.NODE_ENV === 'production' ? {} : error.message 
        });
    }
});

app.post('/api/orders', authUser, async (req, res) => {
    try {
        const { items, totalAmount } = req.body;
        const newOrder = new Order({ user: req.user.id, items, totalAmount });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: 'Error placing order' });
    }
});

app.get('/api/orders/myorders', authUser, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

app.post('/api/products', authAdmin, async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
});

app.delete('/api/products/:id', authAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '../frontend/dist');
    app.use(express.static(buildPath));

    app.get('(.*)', (req, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Grocery Store Backend API is running in Development Mode');
    });
}

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'production' ? {} : err.message
    });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

