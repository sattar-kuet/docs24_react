import { yupResolver } from "@hookform/resolvers/yup";
import cogoToast from "cogo-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUpdateContactMutation } from "../app/features/contact/contactApi";
import { contactSchema } from "../utils/schema/contactSchema";
import PhoneInput from "./PhoneInput";
import CustomButton from "./common/LoadingButton";

export default function ContactFormEdit({ row, setOpen }) {
  // redux elements
  const { userInfo } = useSelector((state) => state.auth);
  const [updateContact, { isLoading, isError, error, data }] =
    useUpdateContactMutation();

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
    resolver: yupResolver(contactSchema),
  });

  // set default values
  useEffect(() => {
    let defaultValues = {};

    defaultValues.name = row?.original?.name;
    defaultValues.email = row?.original?.email;
    defaultValues.company_name = row?.original?.company_name;
    defaultValues.country_code = row?.original?.country_code;
    defaultValues.iso_country_code = row?.original?.iso_country_code;
    defaultValues.phone = row?.original?.phone;

    reset({ ...defaultValues });
  }, [reset, row]);

  // form submit
  const onSubmit = async (data) => {
    if (data) {
      const contact = {
        params: {
          id: row?.original?.id,
          uid: userInfo?.uid,
          ...data,
        },
      };

      await updateContact(contact);
    }
  };

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.error);
    }
    if (data?.result?.status_code === 500) {
      cogoToast.warn(data?.result?.error);
      setOpen(false);
    }
    if (data?.result?.status_code === 200) {
      cogoToast.success("Contact updated successfully");
      setOpen(false);
    }
  }, [isError, error, data, setOpen]);
  return (
    <form
      className="w-full h-full flex items-center justify-center p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <h2 className="text-xl font-semibold text-center">Edit contact</h2>
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
            defaultData={row?.original}
          />
        </label>

        {errors?.phone && (
          <span className="text-sm text-red-500 font-medium mt-1 block">
            {errors?.phone?.message}
          </span>
        )}

        {/* Company Name */}
        <label className="block mt-5 text-sm font-medium text-gray-900">
          Company Name <span className="text-red-600">*</span>
          <div className="border mt-1 border-gray-300 flex items-center h-[42px] hover:border-gray-500 transition-all duration-300">
            <input
              type="text"
              className="text-gray-900 text-sm font-normal outline-none w-full h-full px-3"
              placeholder="Enter your company name"
              {...register("company_name")}
            />
          </div>
        </label>

        {errors?.company_name && (
          <span className="text-sm text-red-500 font-medium mt-1 block">
            {errors?.name?.company_name}
          </span>
        )}

        {/* Submit Button */}
        <CustomButton
          fullWidth={true}
          color="blue"
          type="submit"
          text="Update Contact"
          isLoading={isLoading}
          disabled={isLoading}
          className="mt-5"
        />
      </div>
    </form>
  );
}
