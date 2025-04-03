import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Error } from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";

const UpdateTask = ({ task, onTaskUpdated }) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
    },
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const handleUpdate = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/tasks/${task._id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status === 200) {
        onTaskUpdated();
        setSnackbarMessage("Task updated successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage(response.data.message || "Failed to update task");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("Error updating task");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };  

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className="flex flex-col lg:gap-3 md:gap-2 gap-2 lg:p-4 md:p-3 p-2 border rounded-lg shadow-md bg-white w-full max-w-md">
        <h3 className="text-lg font-semibold">Update Task</h3>

        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="flex flex-col gap-2"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Task Title"
              className={`w-full h-10 border ${
                errors.title ? "border-red-600" : "border-gray-400"
              } rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-600 placeholder:text-gray-400 focus:placeholder:text-gray-300`}
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
                className="absolute -inset-y-1 right-0 flex items-center pr-2 mt-3 cursor-pointer text-red-600"
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
            className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Update Task
          </button>
        </form>
      </div>
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

export default UpdateTask;
