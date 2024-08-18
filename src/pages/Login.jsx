import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton } from "@material-tailwind/react";
import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../app/features/auth/authApi";
import CustomButton from "../components/common/LoadingButton";
import Logo from "../components/layout/Logo";
import { loginSchema } from "../utils/schema/loginSchema";

export default function Login() {
  // states
  const [showPassword, setShowPassword] = useState(false);

  // rtk query mutation
  const [userLogin, { isLoading, isError, error, data }] =
    useUserLoginMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  // react routers
  const location = useLocation();
  const navigate = useNavigate();

  // get requested pathname
  let from = location?.state?.from?.pathname || "/";

  // form submit
  const onSubmit = async (data) => {
    if (data) {
      const user = {
        params: {
          db: "app_db",
          login: data?.email,
          password: data?.password,
        },
      };

      await userLogin(user);
    }
  };

  // user login status side effect
  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.error);
    }
    if (data?.error && data?.error?.code === 200) {
      cogoToast.error(data?.error?.data?.message);
    }
    if (data?.result) {
      navigate(from, { replace: true });
    }
  }, [isError, error, data, from, navigate]);

  return (
    <section className="w-full h-screen px-8">
      <form
        className="w-full h-full flex flex-col items-center justify-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Logo />
        <div className="shadow-lg max-w-[460px] min-w-[360px] w-full p-6">
          <h2 className="text-2xl font-bold text-center">Login</h2>
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

          <span className="block text-right mt-2">
            <NavLink
              to="/forgot-password"
              className="text-sm font-medium text-blue-500 hover:underline"
            >
              Forgot password?
            </NavLink>
          </span>

          <CustomButton
            fullWidth={true}
            color="blue"
            type="submit"
            text="Login"
            isLoading={isLoading}
            disabled={isLoading}
            className="mt-5"
          />

          <h3 className="mt-4 text-center font-normal text-gray-600">
            {"Don't have an account? "}
            <NavLink
              to="/signup"
              className="font-medium text-gray-900 hover:underline hover:text-blue-500"
            >
              Sign Up
            </NavLink>
          </h3>
        </div>
      </form>
    </section>
  );
}
