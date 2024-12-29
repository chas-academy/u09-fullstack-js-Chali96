import mongoose from "mongoose";

const userBooksSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true },

  books: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Book" }],
});

const UserBooks = mongoose.model("UserBooks", userBooksSchema);

export { UserBooks };
