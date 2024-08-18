import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PendingRoute() {
  // Redux elements
  const { userCheckInfo } = useSelector((state) => state.auth);

  // get url location
  const location = useLocation();

  return (
    // check profle status pending
    userCheckInfo?.is_complete && userCheckInfo?.status === "pending" ? (
      <Navigate to="/pending-page" state={{ from: location }} replace />
    ) : // check profle status rejected
    userCheckInfo?.is_complete && userCheckInfo?.status === "rejected" ? (
      <Navigate to="/login" state={{ from: location }} replace />
    ) : // check profle status approved
    userCheckInfo?.is_complete || userCheckInfo?.status === "approved" ? (
      <Outlet />
    ) : (
      // otherwise redirect to setup business or extended profile
      <Navigate to="/profile-setup" state={{ from: location }} replace />
    )
  );
}
