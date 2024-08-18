import { yupResolver } from "@hookform/resolvers/yup";
import cogoToast from "cogo-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateEmployeeMutation } from "../app/features/employee/employeeApi";
import { employeeSchema } from "../utils/schema/employeeSchema";
import PhoneInput from "./PhoneInput";
import PositionSelect from "./PositionSelect";
import CustomButton from "./common/LoadingButton";

export default function EmployeeCreateForm({ setOpen }) {
  // redux elements
  //   const { userInfo } = useSelector((state) => state.auth);
  const [createEmployee, { isLoading, isError, error, data }] =
    useCreateEmployeeMutation();

  // react hook form
  const {
    register,
    setValue,
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(employeeSchema),
  });

  // form submit
  const onSubmit = async (data) => {
    if (data) {
      const employee = {
        params: {
          //   uid: userInfo?.uid,
          ...data,
        },
      };

      await createEmployee(employee);
    }
  };

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.error);
    }
    if (data?.result?.status_code === 400) {
      cogoToast.warn(data?.result?.error);
      setOpen(false);
    }
    if (data?.result?.status_code === 200) {
      cogoToast.success("Contact create successfully");
      setOpen(false);
    }
  }, [isError, error, data, setOpen]);
  return (
    <form
      className="w-full h-full flex items-center justify-center p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <h2 className="text-xl font-semibold text-center">
          Create new employee
        </h2>
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
          />
        </label>

        {errors?.phone && (
          <span className="text-sm text-red-500 font-medium mt-1 block">
            {errors?.phone?.message}
          </span>
        )}

        {/* Position Select */}
        <PositionSelect control={control} errors={errors} />

        {/* Submit Button */}
        <CustomButton
          fullWidth={true}
          color="blue"
          type="submit"
          text="Create Employee"
          isLoading={isLoading}
          disabled={isLoading}
          className="mt-5"
        />
      </div>
    </form>
  );
}
