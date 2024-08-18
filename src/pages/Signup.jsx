import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton } from "@material-tailwind/react";
import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserSignupMutation } from "../app/features/auth/authApi";
import OtpVerify from "../components/OtpVerify";
import PhoneInput from "../components/PhoneInput";
import PositionSelect from "../components/PositionSelect";
import CustomButton from "../components/common/LoadingButton";
import Logo from "../components/layout/Logo";
import { signupSchema } from "../utils/schema/signupSchema";

export default function Signup() {
  // states
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterd, setIsRegisterd] = useState(false);

  // redux elements
  const [userSignup, { isLoading, isError, error, data }] =
    useUserSignupMutation();

  // react hook form
  const {
    register,
    control,
    setValue,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signupSchema),
  });

  // get input value
  const account_type = useWatch({ control, name: "account_type" });
  const email = useWatch({ control, name: "email" });
  const position = useWatch({ control, name: "position" });

  // react routers
  const navigate = useNavigate();

  // form submit
  const onSubmit = async (data) => {
    if (data) {
      const user = {
        params: {
          position: account_type === "business" ? position : "",
          ...data,
        },
      };

      await userSignup(user);
    }
  };

  // user singup status check
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
    if (data?.result?.status_code === 200) {
      cogoToast.success(data?.result?.message);
      setIsRegisterd(true);
    }
    if (data?.result?.status === "email_verification_pending") {
      cogoToast.warn("Account already exist. Verify your account.", {
        hideAfter: 5,
      });
      setIsRegisterd(true);
    }
    if (data?.result?.status === "approved") {
      cogoToast.warn("Account already exist. Please login", { hideAfter: 4 });
      // login
      navigate("/login");
    }
    if (data?.result?.status === "pending") {
      cogoToast.warn(
        `Account already exist. Please login and setup your ${
          data?.result?.is_business_account ? "business" : "extended"
        } profile`,
        { hideAfter: 6 }
      );
      // login
      navigate("/login");
    }
  }, [isError, error, data, navigate]);

  return isRegisterd ? (
    <OtpVerify email={email} />
  ) : (
    <section className="w-full h-full px-8 py-6 md:py-8">
      <form
        className="w-full h-full flex flex-col items-center justify-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Logo />
        <div className="shadow-lg max-w-[460px] min-w-[360px] w-full h-max p-6">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          {/* Full Name */}
          <label className="block mt-5 text-sm font-medium text-gray-900">
            Full Name <span className="text-red-600">*</span>
            <div className="border mt-1 border-gray-300 flex items-center h-[42px] hover:border-gray-500 transition-all duration-300">
              <input
                type="text"
                className="text-gray-900 text-sm font-normal outline-none w-full h-full px-3"
                placeholder="Enter your full name"
                {...register("name")}
              />
            </div>
          </label>

          {errors?.name && (
            <span className="text-sm text-red-500 font-medium mt-1 block">
              {errors?.name?.message}
            </span>
          )}

          {/* Email */}
          <label className="block mt-5 text-sm font-medium text-gray-900">
            Email <span className="text-red-600">*</span>
            <div className="border mt-1 border-gray-300 flex items-center h-[42px] hover:border-gray-500 transition-all duration-300">
              <input
                type="text"
                className="text-gray-900 text-sm font-normal outline-none w-full h-full px-3"
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>
          </label>

          {errors?.email && (
            <span className="text-sm text-red-500 font-medium mt-1 block">
              {errors?.email?.message}
            </span>
          )}

          {/* Password */}
          <label className="block text-sm font-medium text-gray-900 mt-5">
            Password <span className="text-red-600">*</span>
            <div className="border mt-1 border-gray-300 flex items-center gap-2 px-3 h-[42px] hover:border-gray-500 transition-all duration-300">
              <input
                type={showPassword ? "text" : "password"}
                className="text-gray-900 text-sm font-normal outline-none w-full h-full"
                placeholder="Enter your password"
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

          {/* Phone Number */}
          <label className="block mt-5 text-sm font-medium text-gray-900">
            Phone <span className="text-red-600">*</span>
            <PhoneInput
              register={register}
              setValue={setValue}
              resetField={resetField}
            />
          </label>

          {errors?.phone && (
            <span className="text-sm text-red-500 font-medium mt-1 block">
              {errors?.phone?.message}
            </span>
          )}

          {/* Account Type */}
          <span className="block text-sm font-medium text-gray-900 mt-5">
            Account Type <span className="text-red-600">*</span>
            <div className="flex items-center gap-5 mt-2">
              <div className="flex items-center">
                <input
                  id="default-radio-1"
                  type="radio"
                  value="personal"
                  {...register("account_type")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                />

                <label
                  htmlFor="default-radio-1"
                  className="ms-2 text-sm font-medium text-gray-600 "
                >
                  Personal
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="default-radio-2"
                  type="radio"
                  value="business"
                  {...register("account_type")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                />
                <label
                  htmlFor="default-radio-2"
                  className="ms-2 text-sm font-medium text-gray-600"
                >
                  Business
                </label>
              </div>
            </div>
          </span>

          {errors?.account_type && (
            <span className="text-sm text-red-500 font-medium mt-1 block">
              {errors?.account_type?.message}
            </span>
          )}

          {/* Position Select */}
          {account_type === "business" ? (
            <PositionSelect control={control} errors={errors} />
          ) : null}

          {/* Submit Button */}
          <CustomButton
            fullWidth={true}
            color="blue"
            type="submit"
            text="Sign Up"
            isLoading={isLoading}
            disabled={isLoading}
            className="mt-5"
          />

          <h3 className="mt-4 text-center font-normal text-gray-600">
            {"Already have an account? "}
            <NavLink
              to="/login"
              className="font-medium text-gray-900 hover:underline hover:text-blue-500"
            >
              Login
            </NavLink>
          </h3>
        </div>
      </form>
    </section>
  );
}
