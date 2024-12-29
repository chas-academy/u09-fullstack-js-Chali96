// models/User.js
import mongoose from 'mongoose';

// Definiera userSchema först
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

// Skapa User-modellen med userSchema
const User = mongoose.model('User', userSchema);

export { User };