import { useSelector } from "react-redux";
import DashboardExtendedContent from "../components/DashboardExtendedContent";
import EmailLog from "./EmailLog";

export default function Dashboard() {
  // redux elements
  const { userCheckInfo } = useSelector((state) => state.auth);

  return userCheckInfo?.is_business_account ? (
    <EmailLog title="Dashboard" />
  ) : (
    <DashboardExtendedContent />
  );
}
