import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useEmailCheckMutation } from "../app/features/auth/authApi";
import ResetEmailVerify from "../components/ResetEmailVerify";
import CustomButton from "../components/common/LoadingButton";
import Logo from "../components/layout/Logo";

export default function ForgotPassword() {
  // states
  const [isReset, setIsReset] = useState(false);

  // redux elements
  const [emailCheck, { isLoading, isError, error, data }] =
    useEmailCheckMutation();

  // react hook form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // get email from input field
  const email = useWatch({ control, name: "email" });

  // form submit
  const onSubmit = async (data) => {
    if (data) {
      const credential = {
        params: data,
      };

      await emailCheck(credential);
    }
  };

  // email check status
  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.error);
    }
    if (data?.result?.status_code === 403) {
      cogoToast.warn(data?.result?.error);
    }
    if (data?.result?.status_code === 200) {
      cogoToast.success(`We've sent 6 digit code to your email at ${email}`, {
        hideAfter: 6,
      });
      setIsReset(true);
    }
  }, [isError, error, data, email]);
  return isReset ? (
    <ResetEmailVerify email={email} />
  ) : (
    <section className="h-screen w-full flex flex-col gap-6 items-center justify-center">
      <Logo />
      <form className="w-full max-w-[420px]" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-semibold">Forgot Password?</h2>
        <p className="text-sm font-medium text-blue-gray-500 mt-1">
          No worries. Enter your account email address and we will send 6 digit
          code to your email.
        </p>

        {/* Email */}
        <label className="block mt-5 text-sm font-medium text-gray-900">
          Email <span className="text-red-600">*</span>
          <div className="border mt-1 border-gray-300 flex items-center h-[42px] hover:border-gray-500 transition-all duration-300">
            <input
              type="text"
              className="text-gray-900 text-sm font-normal outline-none w-full h-full px-3"
              placeholder="Enter your email"
              {...register("email", { required: "Email is requied" })}
            />
          </div>
        </label>

        {errors?.email && (
          <span className="text-sm text-red-500 font-medium mt-1 block">
            {errors?.email?.message}
          </span>
        )}

        {/* Submit Button */}
        <CustomButton
          fullWidth={true}
          color="blue"
          type="submit"
          text="Continue"
          isLoading={isLoading}
          disabled={isLoading}
          className="mt-5"
        />

        <h3 className="mt-4 text-center">
          <NavLink
            to="/login"
            className="font-medium text-blue-500 hover:underline hover:text-blue-500"
          >
            Return to Login
          </NavLink>
        </h3>
      </form>
    </section>
  );
}
