import { Route, Routes } from "react-router-dom";
import BusinessProfile from "./pages/BusinessProfile";
import ContactList from "./pages/ContactList";
import Dashboard from "./pages/Dashboard";
import EmailLog from "./pages/EmailLog";
import EmployeeList from "./pages/EmployeeList";
import ExtendedProfile from "./pages/ExtendedProfile";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PendingPage from "./pages/PendingPage";
import Profile from "./pages/Profile";
import ProfileSetup from "./pages/ProfileSetup";
import SendEmail from "./pages/SendEmail";
import Signup from "./pages/Signup";
import AuthenticateRoute from "./utils/routes/AuthenticateRoute";
import AuthorizationRoute from "./utils/routes/AuthorizationRoute";
import PendingRoute from "./utils/routes/PendingRoute";
import PrivateRoute from "./utils/routes/PrivateRoute";
import PublicRoute from "./utils/routes/PublicRoute";
import VerifyRoute from "./utils/routes/VerifyRoute";

export default function App() {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="" element={<AuthenticateRoute />}>
          <Route path="" element={<VerifyRoute />}>
            <Route path="" element={<AuthorizationRoute />}>
              <Route path="" element={<PendingRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/extended-profile" element={<ExtendedProfile />} />
                <Route path="/business-profile" element={<BusinessProfile />} />
                <Route path="/employee-list" element={<EmployeeList />} />
                <Route path="/contact-list" element={<ContactList />} />
                <Route path="/send-email" element={<SendEmail />} />
                <Route
                  path="/email-log"
                  element={<EmailLog title="Email Log" />}
                />
              </Route>

              <Route path="/pending-page" element={<PendingPage />} />
            </Route>

            <Route path="/profile-setup" element={<ProfileSetup />} />
          </Route>
        </Route>
      </Route>

      {/* Public Routes */}
      <Route path="" element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
