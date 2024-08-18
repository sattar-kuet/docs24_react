import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton } from "@material-tailwind/react";
import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../app/features/auth/authApi";
import { resetPasswordSchema } from "../utils/schema/resetPasswordSchema";
import CustomButton from "./common/LoadingButton";
import Logo from "./layout/Logo";

export default function ResetPassword({ email }) {
  // states
  const [showPassword, setShowPassword] = useState(false);

  // navigate
  const navigate = useNavigate();

  // redux elements
  const [resetPassword, { isLoading, isError, error, data }] =
    useResetPasswordMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(resetPasswordSchema),
  });

  // form submit
  const onSubmit = async (data) => {
    if (data) {
      const credential = {
        params: {
          email,
          password: data?.password,
        },
      };

      await resetPassword(credential);
    }
  };

  // reset password status
  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.error);
    }
    if (data?.result?.status_code === 200) {
      cogoToast.success(data?.result?.message);
      // direct login or clear all user data from storage and login
      navigate("/login");
    }
  }, [isError, error, data, navigate]);
  return (
    <section className="h-screen w-full flex flex-col gap-5 items-center justify-center">
      <Logo />
      <form className="w-full max-w-[420px]" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-semibold">Reset Password</h2>
        <p className="text-sm font-medium text-blue-gray-500">
          Create new password for your account.
        </p>

        <label className="block text-sm font-medium text-gray-900 mt-5">
          New Password <span className="text-red-600">*</span>
          <div className="border mt-1 border-gray-300 flex items-center gap-2 px-3 h-[42px] hover:border-gray-500 transition-all duration-300">
            <input
              type={showPassword ? "text" : "password"}
              className="text-gray-900 text-sm font-normal outline-none w-full h-full"
              placeholder="Enter new password"
              {...register("password")}
            />

            <IconButton
              variant="text"
              className="rounded-full w-full text-gray-600"
              size="sm"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <BsEyeSlashFill fontSize="1.2rem" />
              ) : (
                <BsEyeFill fontSize="1.2rem" />
              )}
            </IconButton>
          </div>
        </label>

        {errors?.password && (
          <span className="text-sm text-red-500 font-medium mt-1 block">
            {errors?.password?.message}
          </span>
        )}

        <label className="block text-sm font-medium text-gray-900 mt-5">
          Confirm New Password <span className="text-red-600">*</span>
          <div className="border mt-1 border-gray-300 flex items-center gap-2 px-3 h-[42px] hover:border-gray-500 transition-all duration-300">
            <input
              type={showPassword ? "text" : "password"}
              className="text-gray-900 text-sm font-normal outline-none w-full h-full"
              placeholder="Confirm your new password"
              {...register("confirm_password")}
            />

            <IconButton
              variant="text"
              className="rounded-full w-full text-gray-600"
              size="sm"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <BsEyeSlashFill fontSize="1.2rem" />
              ) : (
                <BsEyeFill fontSize="1.2rem" />
              )}
            </IconButton>
          </div>
        </label>

        {errors?.confirm_password && (
          <span className="text-sm text-red-500 font-medium mt-1 block">
            {errors?.confirm_password?.message}
          </span>
        )}

        {/* Submit Button */}
        <CustomButton
          fullWidth={true}
          color="blue"
          type="submit"
          text="Sumbit"
          isLoading={isLoading}
          disabled={isLoading}
          className="mt-5"
        />
      </form>
    </section>
  );
}
