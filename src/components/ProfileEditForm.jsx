import { yupResolver } from "@hookform/resolvers/yup";
import cogoToast from "cogo-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { usePersonalProfileUpdateMutation } from "../app/features/profile/profileApi";
import { profileSchema } from "../utils/schema/profileSchema";
import PhoneInput from "./PhoneInput";
import CustomButton from "./common/LoadingButton";

export default function ProfileEditForm({ profileData, setOpen }) {
  // redux elements
  const { userInfo } = useSelector((state) => state.auth);
  const [personalProfileUpdate, { isLoading, isError, error, data }] =
    usePersonalProfileUpdateMutation();

  // react hook form
  const {
    register,
    setValue,
    handleSubmit,
    resetField,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(profileSchema),
  });

  // set default values
  useEffect(() => {
    let defaultValues = {};

    defaultValues.name = profileData?.result?.user?.name;
    defaultValues.email = profileData?.result?.user?.email;
    defaultValues.country_code = profileData?.result?.user?.country_code;
    defaultValues.iso_country_code =
      profileData?.result?.user?.iso_country_code;
    defaultValues.phone = profileData?.result?.user?.phone;
    defaultValues.position = profileData?.result?.user?.phone
      ? profileData?.result?.user?.phone
      : "";

    reset({ ...defaultValues });
  }, [reset, profileData]);

  // form submit
  const onSubmit = async (data) => {
    if (data) {
      const profile = {
        params: {
          uid: userInfo?.uid,
          ...data,
        },
      };

      await personalProfileUpdate(profile);
    }
  };

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.error);
    }
    if (data?.result?.status_code === 200) {
      cogoToast.success(data?.result?.message);
      setOpen(false);
    }
  }, [isError, error, data, setOpen]);
  return (
    <form
      className="w-full h-full flex items-center justify-center p-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <h2 className="text-xl font-semibold text-center">Edit profile</h2>
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

        {/* Phone Number */}
        <label className="block mt-5 text-sm font-medium text-gray-900">
          Phone <span className="text-red-600">*</span>
          <PhoneInput
            register={register}
            setValue={setValue}
            resetField={resetField}
            defaultData={profileData?.result?.user}
          />
        </label>

        {errors?.phone && (
          <span className="text-sm text-red-500 font-medium mt-1 block">
            {errors?.phone?.message}
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
