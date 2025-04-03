import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GetAllUsers from "../Tasks/Admin/GetAllUsers";
import UpdateAnyTask from "../Tasks/Admin/UpdateAnyTask";

const AdminDashboard = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.snackbarMessage) {
      setSnackbarMessage(location.state.snackbarMessage);
      setSnackbarSeverity(location.state.snackbarSeverity || "success");
      setSnackbarOpen(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, location.pathname, navigate]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCloseUpdateTask = () => {
    setTaskToUpdate(null);
    setReload((prev) => !prev);
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <Link to="/login">
          <div className="font-bold text-blue-500 hover:text-blue-600 duration-300 cursor-pointer">
            Sign In
          </div>
          </Link>
        </div>
        <p className="font-semibold">
          Welcome, Admin! Manage users and tasks here.
        </p>

        <button
          onClick={() => navigate("/create-task")}
          className="bg-blue-500 hover:bg-blue-600 duration-300 hover:scale-105 text-white px-4 py-2 rounded mt-3"
        >
          Create Task
        </button>

        <GetAllUsers setTaskToUpdate={setTaskToUpdate} reload={reload} />
        {taskToUpdate && (
          <UpdateAnyTask
            taskToUpdate={taskToUpdate}
            onClose={handleCloseUpdateTask}
          />
        )}
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
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

export default AdminDashboard;
