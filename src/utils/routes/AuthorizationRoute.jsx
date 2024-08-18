import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthorizationRoute() {
  // Redux elements
  const { userCheckInfo } = useSelector((state) => state.auth);

  // get url location
  const location = useLocation();

  return (
    // check profle is complete after redirect
    userCheckInfo?.is_complete ? (
      <Outlet />
    ) : (
      // otherwise redirect to setup business or extended profile
      <Navigate to="/profile-setup" state={{ from: location }} replace />
    )
  );
}
