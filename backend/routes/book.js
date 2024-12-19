import express from 'express'
import {Book} from '../models/Book.js'
const router = express.Router()
import { verifyAdmin } from './auth.js'

router.post('/add',verifyAdmin,async(req,res)=>{
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
router.get('/books',async(req,res)=>{
    try{
                const books = await Book.find()
                return res.json(books)
    }
    catch(err){
        return res.json(err)

    }
})

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

router.put('/edit/:id',async(req,res)=>{
    try{
               const id=req.params.id;
               const book = await Book.findByIdAndUpdate({_id: id},req.body)
                return res.json({updated:true,book})
    }
    catch(err){
        return res.json(err)

    }
})
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