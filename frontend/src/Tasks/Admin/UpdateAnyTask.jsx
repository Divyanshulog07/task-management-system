import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { Error } from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UpdateAnyTask = ({ taskToUpdate, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const navigate = useNavigate();

  useEffect(() => {
    if (taskToUpdate) {
      setValue("title", taskToUpdate.title);
      setValue("status", taskToUpdate.status || "pending");
      setValue("description", taskToUpdate.description);
    }
  }, [taskToUpdate, setValue]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:4000/api/tasks/admin/${taskToUpdate._id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/admin-dashboard", {
        state: {
          snackbarMessage: "Task updated successfully!",
          snackbarSeverity: "success",
        },
      });

      onClose();
    } catch (error) {
      console.error("Error during update task:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setSnackbarMessage(error.response.data.message);
      } else {
        setSnackbarMessage("Update Task Failed");
      }

      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className="p-6 bg-white shadow-lg rounded-lg mt-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <IoClose size={24} className="hover:text-red-500 duration-300" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Update Any Task</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Task Title"
              className={`w-full h-12 border ${
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
            <select
              name="status"
              className={`border ${
                errors.status ? "border-red-600" : "border-gray-400"
              } rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-600 placeholder:text-gray-400 focus:placeholder:text-gray-300"
                  `}
              {...register("status", {
                required: true,
                validate: (value) => value !== "default",
              })}
            >
              <option value="default">Default</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <Error
                className="absolute inset-y-0 right-0 flex items-center pr-2 mt-2.5 cursor-pointer text-red-600"
                onClick={() => {
                  setSnackbarMessage("Status is required");
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
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
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

export default UpdateAnyTask;
