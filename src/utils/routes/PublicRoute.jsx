import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  // Redux elements
  const { userInfo } = useSelector((state) => state.auth);

  return !userInfo?.email ? <Outlet /> : <Navigate to="/" replace />;
}
