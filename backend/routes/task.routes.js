import express from "express";
import {
  createTask,
  getOwnTasks,
  updateOwnTask,
  markTaskCompleted,
  getAllUsersWithTasks,
  updateAnyTask,
  deleteAnyTask,
} from "../controllers/task.controller.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Admin Routes
router.get("/users", authMiddleware, getAllUsersWithTasks);
router.put("/admin/:id", authMiddleware, adminMiddleware, updateAnyTask);
router.delete("/:id", authMiddleware, adminMiddleware, deleteAnyTask);

// User Routes
router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getOwnTasks);
router.put("/:id", authMiddleware, updateOwnTask);
router.patch("/:id/completed", authMiddleware, markTaskCompleted);

export default router;
