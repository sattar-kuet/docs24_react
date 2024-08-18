import { useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";

export default function DateSelect({ control, setValue, errors }) {
  // get date array
  const dates = useWatch({ control, name: "dates" });

  // set single date from date array
  useEffect(() => {
    if (dates?.startDate) {
      setValue("sender_date", dates?.startDate, {
        shouldValidate: true,
      });
    }
  }, [setValue, dates]);

  return (
    <div className="mt-4">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Select Date <span className="text-red-600">*</span>
      </label>
      <Controller
        name="dates"
        id="dates"
        control={control}
        render={({ field: { ref, ...rest } }) => {
          return (
            <Datepicker
              {...rest}
              inputRef={ref}
              asSingle={true}
              useRange={false}
              popoverDirection="down"
              inputClassName="h-[44px] w-full pl-3 text-sm text-gray-600 border border-gray-300 transition-all duration-300 outline-none focus:outline-none bg-gray-50 hover:border-gray-500"
            />
          );
        }}
      />

      {errors?.sender_date && (
        <span className="text-sm text-red-500 font-medium mt-2 block">
          {errors?.sender_date?.message}
        </span>
      )}
    </div>
  );
}
