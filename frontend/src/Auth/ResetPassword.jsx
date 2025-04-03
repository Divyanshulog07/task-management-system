import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff, Error } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const navigate = useNavigate();

  const passwordValidationRules = {
    required: "Password is required",
    pattern: {
      value:
        /(?=^.{8,}$)((?=.*\d)|(?=.*[\W_]+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      message:
        "Password should include at least one uppercase, one numeric value, and one special character",
    },
    minLength: {
      value: 8,
      message: "Minimum required length is 8",
    },
    maxLength: {
      value: 20,
      message: "Maximum required length is 20",
    },
  };

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `http://localhost:4000/api/auth/reset-password/${token}`,
        {
          newPassword: data.newPassword,
        }
      );
      navigate("/login", {
        state: {
          snackbarMessage: "Password has been reset successfully!",
          snackbarSeverity: "success",
        },
      });
      reset();
    } catch (error) {
      console.error("Error during reset password:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setSnackbarMessage(error.response.data.message);
      } else {
        setSnackbarMessage("Password resetting Failed");
      }

      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handlePasswordPaste = (e) => {
    e.preventDefault();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className="max-w-sm mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3 relative">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className={`border ${
                  errors.password ? "border-red-600" : "border-gray-400"
                } rounded-md px-4 py-2 pr-10 w-full focus:outline-none focus:border-blue-600 placeholder:text-gray-400 focus:placeholder:text-gray-300`}
                {...register("newPassword", passwordValidationRules)}
                onPaste={handlePasswordPaste}
              />
              {!errors.newPassword && (
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </div>
              )}
            </div>
            {errors.newPassword && (
              <Error
                className="absolute inset-y-0 right-0 flex items-center pr-2 mt-2.5 cursor-pointer text-red-600"
                onClick={() => {
                  setSnackbarMessage(errors.newPassword.message);
                  setSnackbarSeverity("error");
                  setSnackbarOpen(true);
                }}
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full p-2 mt-3 bg-blue-500 text-white rounded-md"
          >
            Reset Password
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

export default ResetPassword;
