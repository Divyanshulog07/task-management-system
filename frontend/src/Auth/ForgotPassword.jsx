import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import { Error } from "@mui/icons-material";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
  } = useForm();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      await axios.post("http://localhost:4000/api/auth/forgot-password", data);
      setSnackbarMessage("Reset Link Sended...");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      reset();
    } catch (error) {
      console.error("Error during reset link:", error);
      setSnackbarMessage(error.response?.data?.message || "Reset link Failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-2xl">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <input
            placeholder="Enter Email address"
            className={`w-full h-12 border ${
              errors.email ? "border-red-600" : "border-gray-400"
            } rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-600 placeholder:text-gray-400 focus:placeholder:text-gray-300`}
            {...register("email", { required: true })}
            onFocus={() => {
              if (errors.email) {
                setFocus("email", {
                  shouldSelect: true,
                });
              }
            }}
          />
          {errors.email && (
            <Error
              className="absolute inset-y-0 right-0 flex items-center pr-2 mt-3 cursor-pointer text-red-600"
              onClick={() => {
                setSnackbarMessage("Email address is required");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
              }}
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-3 text-white bg-blue-500 rounded-md flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></span>
              Reset Link Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPassword;
