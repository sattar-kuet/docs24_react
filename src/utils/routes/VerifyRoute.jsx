import cogoToast from "cogo-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import OtpVerify from "../../components/OtpVerify";

export default function VerifyRoute() {
  // Redux elements
  const { userInfo, userCheckInfo } = useSelector((state) => state.auth);

  // check user status
  useEffect(() => {
    if (userCheckInfo?.status === "email_verification_pending") {
      cogoToast.warn("Your account needs to verify.", {
        hideAfter: 4,
      });
    }
  }, [userCheckInfo]);

  return userCheckInfo?.status === "email_verification_pending" ? (
    <OtpVerify email={userInfo?.email} when_login={true} />
  ) : (
    <Outlet />
  );
}
