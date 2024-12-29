// routes/adminBooks.js
import express from 'express';
import { Book } from '../models/Book.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

// CREATE - Lägg till ny bok
// router.post('/books', verifyAdmin, async (req, res) => {
//     const { name, author, imageUrl } = req.body;

//     try {
//         const newBook = new Book({
//             name,
//             author,
//             imageUrl,
//         });

//         await newBook.save();
//         res.status(201).json({ message: 'Book added successfully', book: newBook });
//     } catch (err) {
//         console.error('Error adding book:', err);
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// });

// READ - Hämta alla böcker
router.get('/books', verifyAdmin, async (req, res) => {
    try {
        const books = await Book.find();
        res.json({ books });
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// READ - Hämta en specifik bok
router.get('/books/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ book });
    } catch (err) {
        console.error('Error fetching book:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// UPDATE - Uppdatera en bok
router.put('/books/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;
    const { name, author, imageUrl } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { name, author, imageUrl },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'Book updated successfully', book: updatedBook });
    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// DELETE - Ta bort en bok
router.delete('/books/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error('Error deleting book:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

export { router as adminBooksRouter };