import { yupResolver } from "@hookform/resolvers/yup";
import cogoToast from "cogo-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useExtendedProfileCreateMutation } from "../app/features/profile/profileApi";
import { extendProfileSchema } from "../utils/schema/extendedProfileSchema";
import AvatarUpload from "./AvatarUpload";
import CitySelect from "./CitySelect";
import CountrySelect from "./CountrySelect";
import CustomButton from "./common/LoadingButton";

export default function ExtendedProfileSetup() {
  // redux elements
  const { userInfo } = useSelector((state) => state.auth);
  const [extendedProfileCreate, { isLoading, isError, error, data }] =
    useExtendedProfileCreateMutation();

  // react hook form
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(extendProfileSchema),
  });

  // react routers
  const location = useLocation();
  const navigate = useNavigate();

  // get requested pathname
  let from = location?.state?.from?.pathname || "/";

  // form submit
  const onSubmit = async (data) => {
    if (data) {
      const credential = {
        params: {
          uid: userInfo?.uid,
          ...data,
        },
      };

      await extendedProfileCreate(credential);
    }
  };

  // extended profile status check
  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.error);
    }
    if (data?.result?.status_code === 200) {
      cogoToast.success(data?.result?.message);
      // redirect
      navigate(from, { replace: true });
      window.location.reload();
    }
  }, [isError, error, data, from, navigate]);

  return (
    <form
      className="w-full h-screen flex items-center justify-center px-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="shadow-lg max-w-[480px] min-w-[360px] w-full h-max p-6">
        <h2 className="text-xl font-semibold text-center">
          Setup Extended Profile
        </h2>

        {/* Avatar */}
        <div className="flex justify-center mt-3">
          <AvatarUpload setValue={setValue} errors={errors} />
        </div>

        {/* Country Select */}
        <CountrySelect id="country_name" control={control} errors={errors} />

        {/* City Select */}
        <CitySelect id="city" control={control} errors={errors} />

        {/* Business Address */}
        <label className="block text-sm font-medium text-gray-900 mt-5">
          Business Address <span className="text-red-600">*</span>
          <div className="border mt-1 border-gray-300 flex items-center hover:border-gray-500 transition-all duration-300">
            <textarea
              type="text"
              className="text-gray-900 text-sm font-normal outline-none w-full h-full px-3 py-2"
              placeholder="Enter your business address"
              {...register("business_address")}
            />
          </div>
        </label>

        {errors?.business_address && (
          <span className="text-sm text-red-500 font-medium mt-1 block">
            {errors?.business_address?.message}
          </span>
        )}

        {/* Submit Button */}
        <CustomButton
          fullWidth={true}
          color="blue"
          type="submit"
          text="Setup Profile"
          isLoading={isLoading}
          disabled={isLoading}
          className="mt-5"
        />
      </div>
    </form>
  );
}
