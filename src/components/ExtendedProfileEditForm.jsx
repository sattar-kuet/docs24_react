import { yupResolver } from "@hookform/resolvers/yup";
import cogoToast from "cogo-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useExtendedProfileUpdateMutation } from "../app/features/profile/profileApi";
import AvatarUpload from "../components/AvatarUpload";
import CitySelect from "../components/CitySelect";
import CountrySelect from "../components/CountrySelect";
import CustomButton from "../components/common/LoadingButton";
import { extendProfileSchema } from "../utils/schema/extendedProfileSchema";

export default function ExtendedProfileEditForm({ profileData, setOpen }) {
  // redux elements
  const { userInfo } = useSelector((state) => state.auth);
  const [extendedProfileUpdate, { isLoading, isError, error, data }] =
    useExtendedProfileUpdateMutation();

  // react hook form
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country_name: profileData?.result?.data?.country,
      city: profileData?.result?.data?.city,
      business_address: profileData?.result?.data?.business_address,
    },
    mode: "onChange",
    resolver: yupResolver(extendProfileSchema),
  });

  // form submit
  const onSubmit = async (data) => {
    if (data) {
      const credential = {
        params: {
          uid: userInfo?.uid,
          country_name: data?.country_name,
          city: data?.city,
          business_address: data?.business_address,
          logo: data?.logo,
        },
      };

      await extendedProfileUpdate(credential);
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
    <form className="w-full p-6" onSubmit={handleSubmit(onSubmit)}>
      <div className=" w-full">
        <h2 className="text-xl font-semibold text-center">
          Update Extended Profile
        </h2>

        {/* Avatar */}
        <div className="flex justify-center mt-3">
          <AvatarUpload
            defaultData={profileData?.result?.data?.logo}
            setValue={setValue}
            errors={errors}
          />
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
          text={
            <span className="flex items-center gap-3">
              <MdEdit fontSize="1.1rem" /> Update
            </span>
          }
          isLoading={isLoading}
          disabled={isLoading}
          className="mt-5"
        />
      </div>
    </form>
  );
}
