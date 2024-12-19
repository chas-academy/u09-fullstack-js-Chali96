import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const Connection = async()=>{
    try{
    mongoose.connect(process.env.mongoDb_URL)
    console.log("Connected")
    }
    catch(err){
        console.log("error: "+ err)
    }
}
Connection()
export {Connection}