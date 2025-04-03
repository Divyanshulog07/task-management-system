import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Snackbar, Alert } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Error } from "@mui/icons-material";
import axios from "axios";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm({
    shouldFocusError: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
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

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        data
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      if (user.role === "admin") {
        navigate("/admin-dashboard", {
          state: {
            snackbarMessage: "Sign-in successful!",
            snackbarSeverity: "success",
          },
        });
      } else if (user.role === "user") {
        navigate("/user-dashboard", {
          state: {
            snackbarMessage: "Sign-in successful!",
            snackbarSeverity: "success",
          },
        });
      } else {
        setSnackbarMessage("Unauthorized Role");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }

      reset();
    } catch (error) {
      console.error("Error during sign-in:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setSnackbarMessage(error.response.data.message);
      } else {
        setSnackbarMessage("SignIn Failed");
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
      <div className="max-w-sm mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full h-12 border ${
                errors.password ? "border-red-600" : "border-gray-400"
              } rounded-md px-4 mt-3 focus:outline-none focus:border-blue-600 placeholder:text-gray-400 focus:placeholder:text-gray-300`}
              {...register("password", {
                required: "Password field is required",
              })}
            />
            {!errors.password && (
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </div>
            )}
            {errors.password && (
              <Error
                className="absolute inset-y-0 right-0 flex items-center pr-2 mt-6 cursor-pointer text-red-600"
                onClick={() => {
                  setSnackbarMessage(errors.password.message);
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
            Sign In
          </button>
          <div className="mt-3">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgotten password?
            </Link>
          </div>
          <div className="text-center mt-5">
            <div
              style={{ width: "100%", margin: "0 auto" }}
              className="bg-gray-400 h-[1px]"
            ></div>
            <div
              className={"bg-white text-gray-600"}
              style={{
                position: "relative",
                top: "-13px",
                display: "inline-block",
                padding: "0 10px",
              }}
            >
              don't have an account ?
            </div>
          </div>
          <Link to="/signup">
            <div className="text-center text-blue-500 font-bold cursor-pointer hover:text-blue-600 duration-300 -mt-2">
              Sign Up
            </div>
          </Link>
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

export default SignIn;
