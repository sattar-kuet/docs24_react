import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BusinessProfileSetup from "../components/BusinessProfileSetup";
import ExtendedProfileSetup from "../components/ExtendedProdileSetup";

export default function ProfileSetup() {
  // Redux elements
  const { userCheckInfo } = useSelector((state) => state.auth);

  if (userCheckInfo?.is_business_account && !userCheckInfo?.is_complete) {
    return <BusinessProfileSetup />;
  }
  if (!userCheckInfo?.is_business_account && !userCheckInfo?.is_complete) {
    return <ExtendedProfileSetup />;
  }
  if (userCheckInfo?.is_complete) {
    return <Navigate to="/" />;
  }
}
