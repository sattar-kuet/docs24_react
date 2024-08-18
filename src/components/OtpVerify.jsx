import { IconButton } from "@material-tailwind/react";
import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdInfoOutline } from "react-icons/md";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useEmailVerifyMutation,
  useUserLogoutMutation,
} from "../app/features/auth/authApi";
import { userLoggedOut } from "../app/features/auth/authSlice";
import CustomButton from "./common/LoadingButton";
import Logo from "./layout/Logo";

export default function OtpVerify({ email, when_login }) {
  // states
  const [info, setInfo] = useState(false);

  // navigate
  const navigate = useNavigate();

  // redux elements
  const dispatch = useDispatch();
  const [emailVerify, { isLoading, isError, error, data }] =
    useEmailVerifyMutation();
  const [
    userLogout,
    {
      isLoading: logoutIsLoading,
      isError: logoutIsError,
      error: logoutError,
      data: logoutData,
    },
  ] = useUserLogoutMutation();

  // react hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // form submit
  const onSubmit = async (data) => {
    if (data) {
      const user = {
        params: {
          email,
          ...data,
        },
      };

      await emailVerify(user);
    }
  };

  // verify side effect check
  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.error);
    }
    if (data?.result?.error) {
      cogoToast.error(data?.result?.error);
    }
    if (data?.result?.message && data?.result?.status_code === 500) {
      cogoToast.error(data?.result?.message);
    }
    if (data?.result?.status && data?.result?.message) {
      cogoToast.success(`${data?.result?.message}. Now Login`);
      // direct login or clear all user data from storage and login
      dispatch(userLoggedOut());
      navigate("/login");
    }
  }, [isError, error, data, dispatch, navigate]);

  // logout functionality
  const handleLogout = async () => {
    await userLogout();
  };

  // logout status
  useEffect(() => {
    if (logoutIsError) {
      cogoToast.error(logoutError?.error);
    }
    if (logoutData?.result?.status) {
      cogoToast.info("Try to login your verified account");
    }
  }, [logoutIsError, logoutError, logoutData]);

  return (
    <section className="h-screen w-full flex flex-col gap-8 items-center justify-center">
      <Logo />
      <form className="max-w-[420px] w-full" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-lg text-gray-600 font-semibold text-center mb-5">
          Check your email <span className="text-gray-900">({email})</span> for
          verification code. Etner code to continue
        </h2>

        <Controller
          name="email_verification_code"
          id="email_verification_code"
          control={control}
          rules={{ required: true, minLength: 6 }}
          render={({ field: { ref, value, onChange, ...rest } }) => {
            return (
              <OtpInput
                inputRef={ref}
                value={value}
                onChange={onChange}
                numInputs={6}
                isInputNum={true}
                shouldAutoFocus={true}
                renderSeparator={<span style={{ width: "12px" }}></span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  border: errors?.email_verification_code
                    ? "1px solid rgb(244 67 54)"
                    : "1px solid gray",
                  borderRadius: "0px",
                  width: "60px",
                  height: "60px",
                  fontSize: "24px",
                  color: errors?.email_verification_code
                    ? "rgb(244 67 54)"
                    : "gray",
                  fontWeight: "600",
                  caretColor: "blue",
                  outline: "none",
                }}
                {...rest}
              />
            );
          }}
        />

        {errors?.email_verification_code && (
          <span className="text-sm text-red-500 font-medium mt-1 block">
            Enter your 6 digit code
          </span>
        )}

        <CustomButton
          fullWidth={true}
          color="blue"
          type="submit"
          text="Verify"
          isLoading={isLoading}
          disabled={isLoading}
          className="mt-6"
        />
        {when_login ? (
          <div className="text-center w-full mt-4">
            <p className="mb-3 text-md font-semibold">or</p>
            <CustomButton
              fullWidth={true}
              color="pink"
              text="Try to another account"
              isLoading={logoutIsLoading}
              disabled={logoutIsLoading}
              onClick={handleLogout}
            />
          </div>
        ) : null}
      </form>

      <div className="absolute right-5 top-5 text-right">
        <IconButton
          className="rounded-full"
          variant="text"
          onClick={() => setInfo((i) => !i)}
        >
          <MdInfoOutline fontSize="1.8rem" className="text-gray-600" />
        </IconButton>

        {info ? (
          <div className="bg-white border border-blue-gray-100 p-3 max-w-[220px] text-left text-sm font-medium text-blue-gray-500 italic">
            Note: Check your email inbox. This email send only one time.
          </div>
        ) : null}
      </div>
    </section>
  );
}
