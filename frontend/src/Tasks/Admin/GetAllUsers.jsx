import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Snackbar, Alert } from "@mui/material";

const GetAllUsers = ({ setTaskToUpdate, reload }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const { handleSubmit } = useForm();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  useEffect(() => {
    const fetchUsersAndTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const usersResponse = await axios.get(
          "http://localhost:4000/api/tasks/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUsers(usersResponse.data);
      } catch (error) {
        setSnackbarMessage(
          error.response?.data?.message || "Error fetching users"
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };

    fetchUsersAndTasks();
  }, [reload]);

  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    return user.role.toLowerCase() === filter;
  });

  const onDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSnackbarMessage("Task deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          tasks: user.tasks.filter((task) => task._id !== taskId),
        }))
      );

      setTaskToUpdate((prevTask) =>
        prevTask && prevTask._id === taskId ? null : prevTask
      );
    } catch (error) {
      setSnackbarMessage(
        error.response?.data?.message || "Error deleting task"
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "admin" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("admin")}
          >
            Admins
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("user")}
          >
            Users
          </button>
        </div>
        <ul className="space-y-4">
          {filteredUsers.map((user) => (
            <li key={user._id} className="p-4 bg-gray-100 rounded-lg">
              <strong>{user.username} -</strong> <span>{user.email}</span>
              <span className="font-semibold"> - {user.role}</span>
              <ul className="mt-2 space-y-2">
                {user.tasks?.length > 0 ? (
                  user.tasks.map((task) => (
                    <li
                      key={task._id}
                      className="p-3 bg-gray-200 rounded-lg flex justify-between items-center"
                    >
                      <div className="flex-grow">
                        <p>
                          <strong>Title:</strong> {task.title}
                        </p>
                        <p>
                          <strong>Status:</strong> {task.status}
                        </p>
                        <p>
                          <strong>Description:</strong> {task.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaEdit
                          className="text-blue-500 cursor-pointer hover:text-blue-700"
                          onClick={() => setTaskToUpdate(task)}
                        />
                        <FaTrash
                          className="text-red-500 cursor-pointer hover:text-red-700"
                          onClick={() =>
                            handleSubmit(() => onDelete(task._id))()
                          }
                        />
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-3 text-gray-500">No tasks found</li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          variant="filled"
          severity={snackbarSeverity}
          onClose={handleSnackbarClose}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GetAllUsers;
