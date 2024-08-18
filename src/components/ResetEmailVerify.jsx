import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { useEmailVerifyMutation } from "../app/features/auth/authApi";
import ResetPassword from "./ResetPassword";
import CustomButton from "./common/LoadingButton";
import Logo from "./layout/Logo";

export default function ResetEmailVerify({ email }) {
  // states
  const [isVerified, setIsVerified] = useState(false);

  // redux elements
  const [emailVerify, { isLoading, isError, error, data }] =
    useEmailVerifyMutation();

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

  // verify email status
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
      cogoToast.success(data?.result?.message);
      setIsVerified(true);
    }
  }, [isError, error, data]);

  return isVerified ? (
    <ResetPassword email={email} />
  ) : (
    <section className="h-screen w-full flex flex-col gap-8 items-center justify-center">
      <Logo />
      <form className="max-w-[420px] w-full" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-semibold">Verification</h2>
        <p className="text-md font-medium text-blue-gray-500 mt-1 mb-4">
          Check your email (
          <span className="text-blue-gray-900 font-semibold">{email}</span>) for
          verification code. Etner code to continue
        </p>

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

        {/* submit button */}
        <CustomButton
          fullWidth={true}
          color="blue"
          type="submit"
          text="Continue"
          isLoading={isLoading}
          disabled={isLoading}
          className="mt-6"
        />
      </form>
    </section>
  );
}
