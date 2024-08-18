import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useUserCheckMutation } from "../../app/features/auth/authApi";
import {
  userCheckedIn,
  userLoggedOut,
} from "../../app/features/auth/authSlice";
import Loading from "../../components/common/Loading";

export default function AuthenticateRoute() {
  // states
  const [loading, setLoading] = useState(true);

  // redux elements
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [userCheck, { isError, error, data }] = useUserCheckMutation();

  // user auth status check
  useEffect(() => {
    if (userInfo?.email && userInfo?.uid) {
      const unsubscribe = async () => {
        await userCheck({
          params: {
            uid: userInfo?.uid,
          },
        });
      };

      unsubscribe();
    }
  }, [userInfo, userCheck]);

  // user auth status side effect check
  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.error);
      dispatch(userLoggedOut());
      setLoading(false);
    }
    if (data?.error) {
      cogoToast.error(data?.error?.message);
      dispatch(userLoggedOut());
      setLoading(false);
    }
    if (data?.result?.error) {
      cogoToast.error("Somthing was wrong");
      dispatch(userLoggedOut());
      setLoading(false);
    }
    if (data?.result) {
      dispatch(userCheckedIn(data?.result));
      setLoading(false);
    }
  }, [isError, error, data, dispatch]);

  return loading ? <Loading /> : <Outlet />;
}
