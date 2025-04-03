import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff, Error } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    shouldFocusError: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpForm] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const navigate = useNavigate();

  const usernameValidationRules = {
    required: "Username is required",
    pattern: {
      value: /(?=^.{6,}$)((?=.*\d)|(?=.*[\W_]+))(?![.\n])(?=.*[a-z]).*$/,
      message:
        "Username should include letters, numbers, dots, and underscores",
    },
    validate: {
      noUppercase: (value) =>
        !/[A-Z]/.test(value) ||
        "Uppercase letters are not allowed, such as A to Z",
      noSpecialCharacters: (value) =>
        !/[!@#$%^&*(),?+=":{}|<>]/.test(value) ||
        'Special characters are not allowed, such as ! @ # $ % ^ & * ( ) , ? + = " : { } | < >',
    },
    minLength: {
      value: 6,
      message: "Username should be at least 6 characters",
    },
    maxLength: {
      value: 20,
      message: "Username should not exceed 20 characters",
    },
  };

  const emailValidation = () => {
    const values = getValues();
    const email = values.email;
    if (!email) {
      return "Email address is required";
    }
    const allowedDomains = [
      "gmail",
      "yahoo",
      "ymail",
      "outlook",
      "hotmail",
      "live",
      "icloud",
      "protonmail",
      "zoho",
      "aol",
      "yandex",
      "mail",
      "email",
      "usa",
      "techie",
      "gmx",
      "tutanota",
    ];

    const allowedExtensions = ["com", "net", "org", "in", "ru", "de", "co"];

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return "Please enter a valid email address.";
    }

    const domain = email.split("@")[1].split(".")[0];
    const extension = email.split("@")[1].split(".")[1];

    if (!allowedDomains.includes(domain)) {
      return `Please enter a valid email address with one of the following domains: ${allowedDomains.join(
        ", "
      )}`;
    }

    if (!allowedExtensions.includes(extension)) {
      return `Email address must have one of the following extensions: ${allowedExtensions.join(
        ", "
      )}`;
    }

    return true;
  };

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
      console.log(JSON.stringify(data));

      await axios.post("http://localhost:4000/api/auth/register", data);

      navigate("/login", {
        state: {
          snackbarMessage: "Signup successfully!",
          snackbarSeverity: "success",
        },
      });

      reset();

      setTimeout(() => {
        setSnackbarOpen(false);
      }, 500);
    } catch (error) {
      console.error("Error during sign-up:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setSnackbarMessage(error.response.data.message);
      } else {
        setSnackbarMessage("SignUp Failed");
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
      {showSignUpForm && (
        <div className="max-w-sm mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-2xl">
          <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-3 relative">
              <input
                type="text"
                placeholder="Username"
                className={`border ${
                  errors.username ? "border-red-600" : "border-gray-400"
                } rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-600 placeholder:text-gray-400 focus:placeholder:text-gray-300`}
                {...register("username", usernameValidationRules)}
              />
              {errors.username && (
                <Error
                  className="absolute inset-y-0 right-0 flex items-center pr-2 mt-2.5 cursor-pointer text-red-600"
                  onClick={() => {
                    setSnackbarMessage(errors.username.message);
                    setSnackbarSeverity("error");
                    setSnackbarOpen(true);
                  }}
                />
              )}
            </div>
            <div className="mt-3 relative">
              <input
                placeholder="Email address"
                className={`border ${
                  errors.email ? "border-red-600" : "border-gray-400"
                } rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-600 placeholder:text-gray-400 focus:placeholder:text-gray-300`}
                {...register("email", {
                  validate: emailValidation,
                })}
              />
              {errors.email && (
                <Error
                  className="absolute inset-y-0 right-0 flex items-center pr-2 mt-2.5 cursor-pointer text-red-600"
                  onClick={() => {
                    setSnackbarMessage(errors.email.message);
                    setSnackbarSeverity("error");
                    setSnackbarOpen(true);
                  }}
                />
              )}
            </div>
            <div className="mt-3 relative">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className={`border ${
                    errors.password ? "border-red-600" : "border-gray-400"
                  } rounded-md px-4 py-2 pr-10 w-full focus:outline-none focus:border-blue-600 placeholder:text-gray-400 focus:placeholder:text-gray-300`}
                  {...register("password", passwordValidationRules)}
                  onPaste={handlePasswordPaste}
                />
                {!errors.password && (
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </div>
                )}
              </div>
              {errors.password && (
                <Error
                  className="absolute inset-y-0 right-0 flex items-center pr-2 mt-2.5 cursor-pointer text-red-600"
                  onClick={() => {
                    setSnackbarMessage(errors.password.message);
                    setSnackbarSeverity("error");
                    setSnackbarOpen(true);
                  }}
                />
              )}
            </div>
            <div className="mb-4 mt-3">
              <select
                className="w-full p-2 border border-gray-400 rounded-md"
                {...register("role")}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md"
            >
              Sign Up
            </button>
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
                Already Signup ?
              </div>
            </div>
            <Link to="/login">
            <div className="text-center text-blue-500 font-bold cursor-pointer hover:text-blue-600 duration-300 -mt-2">Sign In</div>
            </Link>
          </form>
        </div>
      )}
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

export default SignUp;
