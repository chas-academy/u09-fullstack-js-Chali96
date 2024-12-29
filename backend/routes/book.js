import express from 'express';
import { Book } from '../models/Book.js';
import { verifyUser } from '../middleware/verifyUser.js'; // Importera autentisering-middleware
import { verifyAdmin } from '../middleware/verifyAdmin.js'
import axios from 'axios';


const router = express.Router();

// Skapa en bok (endast admin)
router.post('/add', verifyAdmin, async (req, res) => {
  try {
      const { name, author, imageUrl } = req.body;

      const newBook = new Book({ name, author, imageUrl });

      await newBook.save();
      return res.json({ added: true, book: newBook });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error adding book' });
  }
});
// Hämta alla böcker (alla användare)
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    return res.json(books);
  } catch (err) {
    console.error(err);
    return res.json({ message: 'Error fetching books' });
  }
});

// Uppdatera bok (alla användare)
router.put('/edit/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    return res.json({ updated: true, book: updatedBook });
  } catch (err) {
    console.error(err);
    return res.json({ message: 'Error updating book' });
  }
});

router.delete('/delete/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.json({ message: 'Book not found' });
    }
    return res.json({ deleted: true });
  } catch (err) {
    console.error(err);
    return res.json({ message: 'Error deleting book' });
  }
});

// Ta bort bok från användarens läslista (endast inloggade användare)
router.delete('/remove-from-list/:bookId', verifyUser, async (req, res) => {
    try {
      const { bookId } = req.params;
      const userId = req.user.id;  // Hämta användarens id från autentisering (req.user sätts i verifyUser)
  
      const userBooks = await UserBooks.findOne({ userId });
  
      if (userBooks) {
        // Ta bort boken från användarens lista
        userBooks.books = userBooks.books.filter(book => book.toString() !== bookId);
        await userBooks.save();
        return res.json({ removed: true });
      } else {
        return res.json({ message: 'No books found for this user' });
      }
    } catch (err) {
      console.error(err);
      return res.json({ message: 'Error removing book from list' });
    }
  });

export { router as bookRouter, verifyUser };
