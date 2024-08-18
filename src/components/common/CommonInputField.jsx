import { Radio, Typography } from "@material-tailwind/react";
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";
import Select from "react-tailwindcss-select";

const CommonInputField = ({ formData, control }) => {
  return (
    <>
      {formData.map((item, index) => {
        if (item.type === "heading") {
          return (
            <div key={index} className={item.className}>
              <Typography variant="h6">{item.label}</Typography>
            </div>
          );
        }
        if (item.type === "select") {
          return (
            <div key={index} className={item.className}>
              <label
                key={`label-${index}`}
                className={`block ${
                  !item.disableMargin && "mt-5"
                } text-sm font-medium text-gray-900 ${item.labelClassName}`}
              >
                <span className="capitalize">{item.label}</span>{" "}
                {item.required && <span className="text-red-600">*</span>}
              </label>

              <Controller
                name={item.name}
                id={item.id}
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Fragment key={`field-${index}`}>
                      <Select
                        {...field}
                        isDisabled={item.disabled}
                        onChange={
                          item.manualOnChange
                            ? (val) => {
                                item.manualOnChange(val);
                                return field.onChange(val?.value);
                              }
                            : (val) => field.onChange(val?.value)
                        }
                        value={item.options?.find(
                          (opt) => opt?.value === field.value
                        )}
                        classNames={{
                          menuButton: ({ isDisabled }) =>
                            `flex items-center justify-between min-h-[30px] text-sm text-gray-500 font-medium border border-gray-300 transition-all duration-300 outline-none focus:outline-none ${
                              isDisabled
                                ? "bg-gray-200"
                                : "bg-white hover:border-gray-500 mt-1 py-[2px]"
                            }`,

                          menu: "absolute z-10 w-full bg-gray-50 shadow-lg py-3 mt-1 text-sm text-gray-800",

                          listItem: ({ isSelected }) =>
                            `block transition duration-200 px-3 py-2 cursor-pointer select-none truncate ${
                              isSelected
                                ? `text-white bg-blue-500`
                                : `text-gray-800 font-medium hover:bg-blue-100 hover:text-blue-600`
                            }`,
                        }}
                        options={item.options}
                      ></Select>

                      {fieldState.error && (
                        <span className="text-sm text-red-500 font-medium mt-1 block">
                          {fieldState.error.message}
                        </span>
                      )}
                    </Fragment>
                  );
                }}
              />
            </div>
          );
        }
        if (item.type === "radio") {
          return (
            <div key={index} className={item.className}>
              <label
                key={`label-${index}`}
                className={`block ${
                  !item.disableMargin && "mt-5"
                } text-sm font-medium text-gray-900 ${item.labelClassName}`}
              >
                <span className="capitalize">{item.label}</span>{" "}
                {item.required && <span className="text-red-600">*</span>}
              </label>

              <Controller
                name={item.name}
                id={item.id}
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Fragment key={`field-${index}`}>
                      <div className={`flex gap-2 ${item.inputClassName}`}>
                        {item.options.map((option, index) => {
                          return (
                            <Radio
                              onChange={() => field.onChange(option.value)}
                              value={option.value}
                              key={index}
                              {...(item.color && {
                                color: item.color,
                              })}
                              label={option.label}
                              disabled={
                                item.disabled ? item.disabled : option.disabled
                              }
                              checked={field.value === option.value}
                            />
                          );
                        })}
                      </div>

                      {fieldState.error && (
                        <span className="text-sm text-red-500 font-medium mt-1 block">
                          {fieldState.error.message}
                        </span>
                      )}
                    </Fragment>
                  );
                }}
              />
            </div>
          );
        }
        if (item.type === "date-picker") {
          return (
            <div key={index} className={item.className}>
              <label
                key={`label-${index}`}
                className={`block ${
                  !item.disableMargin && "mt-5"
                } text-sm font-medium text-gray-900 ${item.labelClassName}`}
              >
                <span className="capitalize">{item.label}</span>{" "}
                {item.required && <span className="text-red-600">*</span>}
              </label>

              <Controller
                name={item.name}
                id={item.id}
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Fragment key={`field-${index}`}>
                      <Datepicker
                        {...field}
                        inputRef={field.ref}
                        asSingle={item.asSingle || false}
                        useRange={item.useRange || false}
                        popoverDirection="down"
                        inputClassName="h-[44px] w-full pl-3 mt-1 text-sm text-gray-600 border border-gray-300 transition-all duration-300 outline-none focus:outline-none bg-gray-50 hover:border-gray-500"
                      />

                      {fieldState.error && (
                        <span className="text-sm text-red-500 font-medium mt-1 block">
                          {fieldState.error.message}
                        </span>
                      )}
                    </Fragment>
                  );
                }}
              />
            </div>
          );
        }

        return (
          <div key={index} className={item.className}>
            <label
              key={`label-${index}`}
              className={`block ${
                !item.disableMargin && "mt-5"
              } text-sm font-medium text-gray-900 ${item.labelClassName}`}
            >
              <span className="capitalize">{item.label}</span>{" "}
              {item.required && <span className="text-red-600">*</span>}
            </label>

            <Controller
              name={item.name}
              id={item.id}
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Fragment key={`field-${index}`}>
                    <div className="border mt-1 border-gray-300 flex items-center h-[42px] hover:border-gray-500 transition-all duration-300">
                      <input
                        type={item.type}
                        className="text-gray-900 text-sm font-normal outline-none w-full h-full px-3"
                        placeholder={item.placeholder}
                        {...field}
                        disabled={item.disabled}
                        onChange={
                          item.manualOnChange
                            ? (event) => {
                                item.manualOnChange(event);
                                return field.onChange(event);
                              }
                            : field.onChange
                        }
                        // {...{
                        //   ...(item.type === "number" && {
                        //     onWheel: (e) => e.target.blur(),
                        //   }),
                        // }}
                      />
                    </div>

                    {fieldState.error && (
                      <span className="text-sm text-red-500 font-medium mt-1 block">
                        {fieldState.error.message}
                      </span>
                    )}
                  </Fragment>
                );
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default CommonInputField;
