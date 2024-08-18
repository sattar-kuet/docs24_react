import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function SetupRoute() {
  // Redux elements
  const { userCheckInfo } = useSelector((state) => state.auth);

  // get url location
  const location = useLocation();

  return (
    // check profile-setup is complete after redirect
    !userCheckInfo?.is_complete ? (
      <Outlet />
    ) : (
      // otherwise redirect
      <Navigate to="/profile-setup" state={{ from: location }} replace />
    )
  );
}
