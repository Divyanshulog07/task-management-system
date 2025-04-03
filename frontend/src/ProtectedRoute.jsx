import NotFoundPage from "./NotFoundPage";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const role = localStorage.getItem("role");

  return allowedRoles.includes(role) ? element : <NotFoundPage/>;
};

export default ProtectedRoute;
