import { useMemo } from "react";
import { Controller } from "react-hook-form";
import Select from "react-tailwindcss-select";
import { useGetCountriesQuery } from "../app/features/data/dataApi";

export default function CountrySelect({ id, control, errors }) {
  // redux query data fetching...
  const {
    isLoading,
    isError,
    error,
    data: countryData,
  } = useGetCountriesQuery();

  // prepare position select options
  const options = useMemo(() => {
    if (countryData?.result?.data?.length > 0) {
      return countryData?.result?.data?.map((value) => {
        return { label: value, value: value };
      });
    } else {
      return [{ label: "None", value: null, disabled: true }];
    }
  }, [countryData?.result?.data]);

  return (
    <div className="mt-4">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Country <span className="text-red-600">*</span>
      </label>

      <Controller
        name={id}
        id={id}
        control={control}
        render={({ field: { ref, onChange, value, ...rest } }) => {
          return (
            <Select
              {...rest}
              inputRef={ref}
              placeholder={"Select country"}
              options={options}
              onChange={(val) => onChange(val?.value)}
              value={options?.find((opt) => opt?.value === value)}
              isClearable={true}
              isDisabled={isError}
              isSearchable={true}
              loading={isLoading}
              classNames={{
                menuButton: ({ isDisabled }) =>
                  `flex items-center justify-between min-h-[42px] text-sm text-gray-500 font-medium border border-gray-300 transition-all duration-300 outline-none focus:outline-none ${
                    isDisabled
                      ? "bg-gray-200"
                      : "bg-gray-100 hover:border-gray-500"
                  }`,

                menu: "absolute z-10 w-full bg-gray-50 shadow-lg py-3 mt-1 text-sm text-gray-800",

                listItem: ({ isSelected }) =>
                  `block transition duration-200 px-3 py-2 cursor-pointer select-none truncate ${
                    isSelected
                      ? `text-white bg-blue-500`
                      : `text-gray-800 font-medium hover:bg-blue-100 hover:text-blue-600`
                  }`,
              }}
            />
          );
        }}
      />

      {isError && (
        <span className="text-sm text-red-500 font-medium mt-2 block text-left">
          {error?.error}
        </span>
      )}

      {errors?.[id] && (
        <span className="text-sm text-red-500 font-medium mt-1 block">
          {errors?.[id]?.message}
        </span>
      )}
    </div>
  );
}
