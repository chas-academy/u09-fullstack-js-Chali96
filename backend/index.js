import  express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import cookieParser from "cookie-parser";
import "./db.js";
import { adminRouter } from './routes/admin.js';
import { userBooksRouter } from './routes/userBooks.js';
import { bookRouter } from './routes/book.js';
import { AdminRouter } from './routes/auth.js';  // Se till att du importerat rätt router

import { Book } from './models/Book.js'
import { User } from './models/User.js'
import { Admin } from './models/Admin.js'




const app = express()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
app.use(cookieParser())
dotenv.config()

app.use('/admin', adminRouter); // Admin-rutter
app.use('/user-books', userBooksRouter); // Användarens böcker
app.use('/book', bookRouter); // Böcker (CRUD på böcker)
app.use('/auth', AdminRouter); // Se till att användningen av '/auth' är korrekt


app.get('/dashboard', async (req, res) => {
    try {
        const user = await User.countDocuments()
        const admin = await Admin.countDocuments()
        const book = await Book.countDocuments()
        return res.json({ok: true, user, book, admin})
    } catch(err) {
        return res.json(err)
    }
    
})

app.get("/", (req, res) => {
    res.send("Backend is running!");
});


app.listen(process.env.PORT, () => {
    console.log("server is running");
});
