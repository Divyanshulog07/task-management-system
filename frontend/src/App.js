import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import UserDashboard from "./dashboard/UserDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import CreateTask from "./Tasks/User/CreateTask";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Authentication Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Dashboard Routes with Role Protection */}
          <Route
            path="/user-dashboard"
            element={<ProtectedRoute element={<UserDashboard />} allowedRoles={["user"]} />}
          />
          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />}
          />

          {/* Create Task Route */}
          <Route path="/create-task" element={<ProtectedRoute element={<CreateTask />} allowedRoles={["admin", "user"]} />} />

          {/* Default Route */}
          <Route path="/" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
