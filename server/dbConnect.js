import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://lms:lms-2023@cluster0.7cmowhy.mongodb.net/lms-learning';

async function dbConnect(){
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Mongo DB connected successfully');
    } catch (error) {
        console.error("connection failed");
    }
}
dbConnect();