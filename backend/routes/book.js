import express from 'express'
import {Book} from '../models/Book.js'
const router = express.Router()
import { verifyAdmin } from './auth.js'

// verifyAdmin ska vara i router.post /add

router.post('/add', async(req,res)=>{
    try{
        const{name,author,imageUrl}=req.body;
    
            const newbook = new Book({name,author,imageUrl})
        
                await newbook.save()
                return res.json({added:true})

    }
    catch(err){
        return res.json({message:"error in adding book"})
    }
})
router.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        return res.json(books);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching books", error: err });
    }
});

router.get('/edit/:id',async(req,res)=>{
    try{
               const id=req.params.id;
               const book = await Book.findById({_id: id})
                return res.json(book)
    }
    catch(err){
        return res.json(err)

    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;  // Hämta id från URL
        const updateData = req.body; // Hämta den nya data från body

        // Försök att hitta och uppdatera boken
        const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });  // Om boken inte finns
        }

        // Skicka tillbaka den uppdaterade boken
        return res.json({ updated: true, book: updatedBook });
    } catch (err) {
        // Om något går fel, skicka tillbaka ett felmeddelande
        return res.status(500).json({ message: "Error updating book", error: err });
    }
});

router.delete('/delete/:id',async(req,res)=>{
    try{
               const id=req.params.id;
               const book = await Book.findByIdAndDelete({_id: id})
                return res.json({deleted:true,book})
    }
    catch(err){
        return res.json(err)

    }
})
export {router as bookRouter}