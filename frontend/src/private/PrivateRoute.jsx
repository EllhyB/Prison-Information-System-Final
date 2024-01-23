import { useContext } from "react";
import { AuthContext } from "../contacts/AuthProvider";
import { Navigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return (
    <Navigate
      to="/login"
      state={{ from: "/admin/dashboard/manage" }}
      replace
    ></Navigate>
  );
};

export default PrivateRoute;
