import { yupResolver } from "@hookform/resolvers/yup";
import cogoToast from "cogo-toast";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useBusinessProfileUpdateMutation } from "../app/features/profile/profileApi";
import CategorySelect from "../components/CategorySelect";
import CitySelect from "../components/CitySelect";
import CountrySelect from "../components/CountrySelect";
import CustomButton from "../components/common/LoadingButton";
import { businessProfileSchema } from "../utils/schema/businessProfileSchema";
import AvatarUpload from "./AvatarUpload";

export default function BusinessProfileEditForm({ profileData, setOpen }) {
  // redux elements
  const { userInfo } = useSelector((state) => state.auth);
  const [businessProfileUpdate, { isLoading, isError, error, data }] =
    useBusinessProfileUpdateMutation();

  // prepare category default value
  const categoryDefaultValue = useMemo(() => {
    if (profileData?.result?.data?.categories?.length > 0) {
      return profileData?.result?.data?.categories?.map((category) => {
        return { label: category?.name, value: category?.id };
      });
    } else {
      return null;
    }
  }, [profileData?.result?.data]);

  // react hook form
  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(businessProfileSchema),
  });

  // set default values
  useEffect(() => {
    let defaultValues = {};

    defaultValues.business_name = profileData?.result?.data?.name;
    defaultValues.website = profileData?.result?.data?.url;
    defaultValues.abn = profileData?.result?.data?.abn;
    defaultValues.country_name = profileData?.result?.data?.country;
    defaultValues.city = profileData?.result?.data?.city;
    defaultValues.logo = profileData?.result?.data?.logo;
    defaultValues.business_address =
      profileData?.result?.data?.business_address;
    defaultValues.category = categoryDefaultValue;

    reset({ ...defaultValues });
  }, [reset, profileData?.result?.data, categoryDefaultValue]);

  // form submit
  const onSubmit = async (data) => {
    if (data) {
      const credential = {
        params: {
          uid: userInfo?.uid,
          email: userInfo?.email,
          id: profileData?.result?.data?.id,
          country_code: "+880",
          ...data,
        },
      };

      await businessProfileUpdate(credential);
    }
  };

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.error);
    }
    if (data?.result?.status_code === 200) {
      cogoToast.success(data?.result?.message);
      setOpen((cur) => !cur);
    }
  }, [isError, error, data, setOpen]);

  return (
    <form
      className="w-full flex items-center justify-center p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <h2 className="text-xl font-semibold text-center">
          Edit Business Profile
        </h2>

        {/* Avatar */}
        <div className="flex justify-center mt-3">
          <AvatarUpload
            defaultData={profileData?.result?.data?.logo}
            setValue={setValue}
            errors={errors}
          />
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
        <CategorySelect control={control} errors={errors} setValue={setValue} />

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
          text="Update Profile"
          isLoading={isLoading}
          disabled={isLoading}
          className="mt-5"
        />
      </div>
    </form>
  );
}
