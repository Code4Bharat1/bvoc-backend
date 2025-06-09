import mongoose from "mongoose";
import dotenv from "dotenv";    
dotenv.config();

const dbConfig = {
    url: process.env.DATABASE_URI,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};

const connectDB = async () => {
    try {
        await mongoose.connect(dbConfig.url, dbConfig.options);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}
export { connectDB };