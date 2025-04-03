import Task from "../models/task.model.js";
import User from "../models/user.model.js";

// Admin: Get All Users with Their Tasks
export const getAllUsersWithTasks = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied, admin only" });
    }

    const users = await User.find().select("-password");

    const usersWithTasks = await Promise.all(
      users.map(async (user) => {
        const tasks = await Task.find({ user: user._id });
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          tasks: tasks,
        };
      })
    );

    res.json(usersWithTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update Any Task
export const updateAnyTask = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied, admin only" });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete Any Task
export const deleteAnyTask = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied, admin only" });
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User: Create Task
export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user._id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User: Get Their Own Tasks
export const getOwnTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User: Update Their Own Task
export const updateOwnTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) return res.status(403).json({ message: "Unauthorized" });

    Object.assign(task, req.body);
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User: Mark Their Own Task as Completed
export const markTaskCompleted = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status: "completed" },
      { new: true }
    );

    if (!task) return res.status(403).json({ message: "Unauthorized" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
