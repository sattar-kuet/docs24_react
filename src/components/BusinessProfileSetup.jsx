import { yupResolver } from "@hookform/resolvers/yup";
import cogoToast from "cogo-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useBusinessProfileCreateMutation } from "../app/features/profile/profileApi";
import { businessProfileSchema } from "../utils/schema/businessProfileSchema";
import AvatarUpload from "./AvatarUpload";
import CategorySelect from "./CategorySelect";
import CitySelect from "./CitySelect";
import CountrySelect from "./CountrySelect";
import CustomButton from "./common/LoadingButton";

export default function BusinessProfileSetup() {
  // redux elements
  const { userInfo } = useSelector((state) => state.auth);
  const [businessProfileCreate, { isLoading, isError, error, data }] =
    useBusinessProfileCreateMutation();

  // react hook form
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(businessProfileSchema),
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
          email: userInfo?.email,
          uid: userInfo?.uid,
          ...data,
        },
      };

      await businessProfileCreate(credential);
    }
  };

  // business profile status check
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
  }, [isError, error, data, navigate, from]);

  return (
    <form
      className="w-full h-full flex items-center justify-center px-8 py-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="shadow-lg max-w-[480px] min-w-[360px] w-full h-max p-6">
        <h2 className="text-2xl font-bold text-center">
          Business Profile Setup
        </h2>

        {/* Avatar */}
        <div className="flex justify-center mt-3">
          <AvatarUpload setValue={setValue} errors={errors} />
        </div>

        {/* Business Name */}
        <label className="block mt-5 text-sm font-medium text-gray-900">
          Business Name <span className="text-red-600">*</span>
          <div className="border mt-1 border-gray-300 flex items-center h-[42px] hover:border-gray-500 transition-all duration-300">
            <input
              type="text"
              className="text-gray-900 text-sm font-normal outline-none w-full h-full px-3"
              placeholder="Enter your business name"
              {...register("business_name")}
            />
          </div>
        </label>

        {errors?.business_name && (
          <span className="text-sm text-red-500 font-medium mt-1 block">
            {errors?.business_name?.message}
          </span>
        )}

        {/* Category Select */}
        <CategorySelect control={control} setValue={setValue} errors={errors} />

        {/* Website URL */}
        <label className="block mt-5 text-sm font-medium text-gray-900">
          Website URL <span className="text-red-600">*</span>
          <div className="border mt-1 border-gray-300 flex items-center h-[42px] hover:border-gray-500 transition-all duration-300">
            <input
              type="text"
              className="text-gray-900 text-sm font-normal outline-none w-full h-full px-3"
              placeholder="Enter your website url"
              {...register("website")}
            />
          </div>
        </label>

        {errors?.website && (
          <span className="text-sm text-red-500 font-medium mt-1 block">
            {errors?.website?.message}
          </span>
        )}

        {/* Business ABN */}
        <label className="block text-sm font-medium text-gray-900 mt-5">
          Business ABN <span className="text-red-600">*</span>
          <div className="border mt-1 border-gray-300 flex items-center h-[42px] hover:border-gray-500 transition-all duration-300">
            <input
              type="text"
              className="text-gray-900 text-sm font-normal outline-none w-full h-full px-3"
              placeholder="Enter your business abn"
              {...register("abn")}
            />
          </div>
        </label>

        {errors?.abn && (
          <span className="text-sm text-red-500 font-medium mt-1 block">
            {errors?.abn?.message}
          </span>
        )}

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
