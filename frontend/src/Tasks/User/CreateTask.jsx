import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Error } from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateTask = ({ onTaskCreated }) => {
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/tasks",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        // Call the callback to update tasks instead of reloading the page
        onTaskCreated && onTaskCreated(response.data);
        reset();

        const userRole = localStorage.getItem("role");
        if (userRole === "admin") {
          navigate("/admin-dashboard", {
            state: {
              snackbarMessage: "Task created successfully!",
              snackbarSeverity: "success",
            },
          });
        }else{
          navigate("/user-dashboard", {
            state: {
              snackbarMessage: "Task created successfully!",
              snackbarSeverity: "success",
            },
          });
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error creating task");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 p-4 border rounded shadow-md"
      >
        <h3 className="text-lg font-semibold mb-2">Create Task</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter Task Title"
            className={`w-full h-12 border ${
              errors.title ? "border-red-600" : "border-gray-400"
            } rounded-md px-4 py-2 focus:outline-none focus:border-blue-600 placeholder:text-gray-400 focus:placeholder:text-gray-300`}
            {...register("title", { required: true })}
            onFocus={() => {
              if (errors.title) {
                setFocus("title", {
                  shouldSelect: true,
                });
              }
            }}
          />
          {errors.title && (
            <Error
              className="absolute inset-y-0 right-0 flex items-center pr-2 mt-3 cursor-pointer text-red-600"
              onClick={() => {
                setSnackbarMessage("Title is required");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
              }}
            />
          )}
        </div>
        <div className="relative mt-3">
          <textarea
            name="description"
            placeholder="Update Task Description"
            className={`border ${
              errors.description ? "border-red-600" : "border-gray-400"
            } rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-600 placeholder:text-gray-400 focus:placeholder:text-gray-300`}
            rows="3"
            {...register("description", { required: true })}
            onFocus={() => {
              if (errors.description) {
                setFocus("description", { shouldSelect: true });
              }
            }}
          />
          {errors.description && (
            <Error
              className="absolute inset-y-0 right-0 flex items-center pr-2 mt-2.5 cursor-pointer text-red-600"
              onClick={() => {
                setSnackbarMessage("Task Description is required");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
              }}
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-2 mt-2 rounded w-full"
        >
          Add Task
        </button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateTask;
