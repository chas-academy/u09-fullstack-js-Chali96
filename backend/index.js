import  express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import cookieParser from "cookie-parser";
import "./db.js";
import { adminRouter } from './routes/admin.js';
import { userBooksRouter } from './routes/userBooks.js';
import { bookRouter } from './routes/book.js';
import { AuthRouter } from './routes/auth.js';  
import { adminBooksRouter } from './routes/adminBooks.js';

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

app.use('/admin', adminRouter); // Admin-rutter för inloggning och utloggning/register
app.use('/user-books', userBooksRouter); // Användarens böcker
app.use('/book', bookRouter); // Böcker (CRUD på böcker)
app.use('/auth', AuthRouter);  // autentisering
app.use('/admin', adminBooksRouter); // admin rutter för crud på böcker


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


app.listen(process.env.PORT, () => {
    console.log("server is running");
});
