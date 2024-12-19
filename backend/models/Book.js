import mongoose from "mongoose";

const bookschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
        
    },
    imageUrl:{
        type:String,
        required:true,
       
    },
   
})
const bookModel = mongoose.model('Book',bookschema)
export {bookModel as Book}