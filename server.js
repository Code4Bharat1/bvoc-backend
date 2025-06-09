import { connectDB } from "./config/db.config.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import appointmentsRouter from "./routes/appointments.router.js";
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());


connectDB();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
// Export the app for testing purposes
app.use("/api/appointments", appointmentsRouter);