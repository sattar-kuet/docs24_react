import cogoToast from "cogo-toast";
import { useEffect } from "react";
import { MdOutlineArrowForward } from "react-icons/md";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useUserCheckMutation } from "../app/features/auth/authApi";
import CustomButton from "../components/common/LoadingButton";

export default function PendingPage() {
  // redux elements
  const { userInfo, userCheckInfo } = useSelector((state) => state.auth);
  const [userCheck, { isLoading, isError, error }] = useUserCheckMutation();

  // react routers
  const location = useLocation();
  const navigate = useNavigate();

  // get requested pathname
  let from = location?.state?.from?.pathname || "/";

  // route change function
  const handleRouteChange = async () => {
    const { data } = await userCheck({
      params: {
        uid: userInfo?.uid,
      },
    });

    if (data?.result?.status === "pending") {
      cogoToast.warn("Your account is pending");
    }
    if (data?.result?.status === "rejected") {
      cogoToast.error("Your account has rejected");
      navigate("/login");
    }
    if (data?.result?.status === "approved") {
      cogoToast.success("Your account has approved");
      navigate(from, { replace: true });
      window.location.reload();
    }
  };

  // user info status check
  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.error);
    }
  }, [isError, error]);

  // account approved then redirect to dashboard
  if (userCheckInfo?.status === "approved") {
    return <Navigate to="/" />;
  }

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center bg-white/30 backdrop-blur-md">
      <span className="text-lg text-pink-500 font-medium block">
        Please waiting for admin approval.
      </span>

      <div className="flex w-[230px] bg-blue-gray-400 justify-center mt-6">
        <CustomButton
          color="pink"
          fullWidth={true}
          type="button"
          isLoading={isLoading}
          disabled={isLoading}
          onClick={handleRouteChange}
          text={
            <span className="flex items-center gap-3 ">
              Go to Dashboard <MdOutlineArrowForward fontSize="1.3rem" />
            </span>
          }
        />
      </div>
    </section>
  );
}
