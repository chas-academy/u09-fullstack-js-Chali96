import express from 'express';
import { User } from '../models/User.js';
import { Book } from '../models/Book.js';
import { verifyAdmin } from '../middleware/verifyUser.js'; // Importera verifyAdmin

const router = express.Router();

// CRUD för användare (endast admin)
router.get('/users', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.json({ message: 'Error fetching users' });
  }
});

// Skapa bok (endast admin)
router.post('/add-book', verifyAdmin, async (req, res) => {
  const { name, author, imageUrl } = req.body;

  try {
    const newBook = new Book({ name, author, imageUrl });
    await newBook.save();
    res.json({ added: true, book: newBook });
  } catch (err) {
    console.error(err);
    res.json({ message: 'Error adding book' });
  }
});

// Uppdatera användare (endast admin)
router.put('/update-user/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({ updated: true, user });
  } catch (err) {
    console.error(err);
    res.json({ message: 'Error updating user' });
  }
});

// Ta bort användare (endast admin)
router.delete('/delete-user/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ deleted: true });
  } catch (err) {
    console.error(err);
    res.json({ message: 'Error deleting user' });
  }
});

export { router as adminRouter };
