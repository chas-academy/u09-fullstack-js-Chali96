import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB:", mongoose.connection.name);
    // mongoose.connection.name visar vilket databasenamn du har anslutit till
  } catch (err) {
    console.log("error: " + err);
  }
};

Connection();
export { Connection };
