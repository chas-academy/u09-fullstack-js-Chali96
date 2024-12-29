// routes/adminUsers.js
import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

// CREATE - Lägg till ny användare
router.post('/users', verifyAdmin, async (req, res) => {
    const { email, username, password, role } = req.body;

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
            role: role || 'user',
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// READ - Hämta alla användare
router.get('/users', verifyAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exkludera lösenord
        res.json({ users });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// READ - Hämta en specifik användare
router.get('/users/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// UPDATE - Uppdatera en användare
router.put('/users/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;
    const { email, username, password, role } = req.body;

    try {
        const updateData = { email, username, role };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// DELETE - Ta bort en användare
router.delete('/users/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

export { router as adminRouter };
