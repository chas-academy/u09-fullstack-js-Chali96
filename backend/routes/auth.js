// routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

const router = express.Router();

// Registrera vanlig användare
router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            role: 'user', // Explicit sätta rollen till 'user'
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ success: true, message: 'User registered successfully', token });
    } catch (err) {
        console.error('Error during registration:', err); 
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Registrera admin
router.post('/register-admin', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new User({
            email,
            username,
            password: hashedPassword,
            role: 'admin', // Specificera rollen som 'admin'
        });

        await newAdmin.save();

        const token = jwt.sign(
            { id: newAdmin._id, role: newAdmin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'Admin created successfully', token });
    } catch (err) {
        console.error("Error in creating admin: ", err); 
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Login-rutt för användare
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Skapa JWT-token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login-rutt för admin
router.post('/admin-login', async (req, res) => {
    console.log('Admin login attempted'); // För debugging
    const { email, password } = req.body;

    try {
        const admin = await User.findOne({ email, role: 'admin' });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            console.log('Invalid password');
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Skapa JWT-token
        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, role: admin.role });
    } catch (err) {
        console.error('Error during admin login:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Verifiera användare
router.get('/verify', (req, res) => {
    const token = req.cookies.token || req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        res.json({ login: true, role: decoded.role });
    });
});

export { router as AuthRouter };