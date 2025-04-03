import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./configs/db.config.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectToDB();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;

// Defining routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
