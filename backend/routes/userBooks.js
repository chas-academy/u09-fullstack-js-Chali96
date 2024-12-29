// routes/userBooks.js
import express from 'express';
import { UserBooks } from '../models/UserBooks.js';
import { verifyUser } from '../middleware/verifyUser.js'; // Middleware för att verifiera användare

const router = express.Router();

// Lägg till bok i användarens lista
router.post('/add-to-list', verifyUser, async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user.id; // Hämtad från token
    const role = req.user.role;

    try {
        let userBooks = await UserBooks.findOne({ userId });

        if (userBooks) {
            if (!userBooks.books.includes(bookId)) {
                userBooks.books.push(bookId);
                await userBooks.save();
            }
        } else {
            userBooks = new UserBooks({ userId, books: [bookId] });
            await userBooks.save();
        }

        res.json({ added: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding book to list' });
    }
});

// Ta bort bok från användarens lista
router.delete('/remove-from-list/:bookId', verifyUser, async (req, res) => {
    const { bookId } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    try {
        const userBooks = await UserBooks.findOne({ userId });
        if (userBooks) {
            userBooks.books = userBooks.books.filter(book => book.toString() !== bookId);
            await userBooks.save();
            return res.json({ removed: true });
        } else {
            return res.json({ message: 'No books found for this user' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error removing book from list' });
    }
});

// Hämta böcker i användarens lista
router.get('/', verifyUser, async (req, res) => {
    const userId = req.user.id;

    try {
        const userBooks = await UserBooks.findOne({ userId }).populate('books');
        if (userBooks) {
            return res.json({ books: userBooks.books });
        } else {
            return res.json({ books: [] });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching books' });
    }
});

export { router as userBooksRouter };