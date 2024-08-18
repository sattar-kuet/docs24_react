import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  // Redux elements
  const { userInfo } = useSelector((state) => state.auth);

  // get url location
  const location = useLocation();

  return userInfo?.email && userInfo?.uid ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
