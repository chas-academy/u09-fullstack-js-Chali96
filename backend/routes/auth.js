import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { Admin } from '../models/Admin.js';

const router = express.Router();

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
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ success: true, message: 'User registered successfully', token });
    } catch (err) {
        console.error('Error during registration:', err); 
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});



// router.post('/register-admin', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       // Kontrollera om admin redan finns
//       const existingAdmin = await Admin.findOne({ email });
//       if (existingAdmin) {
//         return res.status(400).json({ message: 'Admin already exists' });
//       }
  
//       // Hasha lösenordet
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       // Skapa en ny admin
//       const newAdmin = new Admin({
//         email,
//         password: hashedPassword,
//       });
  
//       await newAdmin.save();
  
//       // Skapa JWT-token för den nya adminen
//       const token = jwt.sign({ id: newAdmin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
//       res.status(201).json({ message: 'Admin created successfully', token });
//     } catch (err) {
//       console.error("Error in creating admin: ", err);  // Lägg till detta för att få mer detaljer i loggen
//       res.status(500).json({ message: 'Server error', error: err.message });
//     }
//   });
  

// Login- user rutt
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
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/admin-login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Admin.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Skapa JWT-token
        const token = jwt.sign({ id: Admin._id, role: Admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, role: Admin.role });
    } catch (err) {
        console.error(err);
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

export { router as AdminRouter };
