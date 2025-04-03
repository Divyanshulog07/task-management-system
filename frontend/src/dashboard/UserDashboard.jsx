import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CreateTask from "../Tasks/User/CreateTask";
import TaskList from "../Tasks/User/TaskList";

const UserDashboard = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [refreshTasks, setRefreshTasks] = useState(0);

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

  const triggerRefresh = () => {
    setRefreshTasks((prev) => prev + 1);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">User Dashboard</h2>
          <Link to="/login">
            <div className="font-bold text-blue-500 hover:text-blue-600 duration-300 cursor-pointer">
              Sign In
            </div>
          </Link>
        </div>
        <p>Welcome to your dashboard!</p>
        <CreateTask onTaskCreated={triggerRefresh} />
        <TaskList refreshTasks={refreshTasks} />
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

export default UserDashboard;



