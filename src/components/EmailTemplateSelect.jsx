import { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from "react-tailwindcss-select";
import { useGetEmailTemplateQuery } from "../app/features/email/emailApi";
import QuoteForm from "./QuoteForm";
import PaySlipForm from "./PaySlipForm";
import CommonMailClientProjectForm from "./CommonMailClientProjectForm";
import InvoiceForm from "./invoiceForm";
import PurchaseOrderForm from "./PurchaseOrderForm";

export default function EmailTamplateSelect({
  control,
  errors,
  register,
  watch,
  setValue,
}) {
  // states
  const [templates, setTemplates] = useState([]);

  // redux elements
  const { userInfo } = useSelector((state) => state.auth);
  const {
    isLoading,
    isError,
    error,
    data: templateData,
  } = useGetEmailTemplateQuery({ params: { uid: userInfo?.uid } });

  // get template code
  // const template_code = useWatch({ control, name: "template_code" });
  const template_code = watch("template_code");

  // set email tempalte
  useEffect(() => {
    if (templateData?.result?.data?.length > 0) {
      setTemplates(
        templateData?.result?.data?.find(
          (template) => template?.code_name === template_code
        )
      );
    }
  }, [templateData?.result?.data, template_code]);

  // prepare email template select options
  const options = useMemo(() => {
    if (templateData?.result?.data?.length > 0) {
      return templateData?.result?.data?.map((template) => {
        return { label: template?.name, value: template?.code_name };
      });
    } else {
      return [{ label: "None", value: null, disabled: true }];
    }
  }, [templateData?.result?.data]);

  return (
    <div className="mt-4">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Select Template <span className="text-red-600">*</span>
      </label>

      <Controller
        name="template_code"
        id="template_code"
        control={control}
        render={({ field: { ref, onChange, value, ...rest } }) => {
          return (
            <Select
              {...rest}
              inputRef={ref}
              placeholder={"Select email template"}
              options={options}
              onChange={(val) => onChange(val?.value)}
              value={options?.find((opt) => opt?.value === value)}
              isClearable={true}
              isDisabled={isError}
              isSearchable={true}
              loading={isLoading}
              classNames={{
                menuButton: ({ isDisabled }) =>
                  `flex items-center justify-between min-h-[44px] text-sm text-gray-500 font-medium border border-gray-300 transition-all duration-300 outline-none focus:outline-none ${
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

      {errors?.template_code && (
        <span className="text-sm text-red-500 font-medium mt-1 block">
          {errors?.template_code?.message}
        </span>
      )}

      {templates?.field_list?.length > 0
        ? templates?.field_list?.map((field_list, index) => (
            <label
              className="block mt-5 text-sm font-medium text-gray-900"
              key={index}
            >
              <span className="capitalize">
                {field_list?.replace("_", " ")}
              </span>{" "}
              <span className="text-red-600">*</span>
              <div className="border mt-1 border-gray-300 flex items-center h-[42px] hover:border-gray-500 transition-all duration-300">
                <input
                  type="text"
                  className="text-gray-900 text-sm font-normal outline-none w-full h-full px-3"
                  placeholder={`Enter ${field_list?.replace("_", " ")}`}
                  {...register(field_list)}
                />
              </div>
            </label>
          ))
        : null}

      {/* render additional email template */}
      {(templates?.code_name === "structurals_certificate" ||
        templates?.code_name === "stormwater_certificate") && (
        <CommonMailClientProjectForm control={control} />
      )}

      {/* quote */}
      {templates?.code_name === "quote" && (
        <QuoteForm control={control} watch={watch} setValue={setValue} />
      )}

      {/* invoice */}
      {templates?.code_name === "invoice" && (
        <InvoiceForm control={control} watch={watch} setValue={setValue} />
      )}

      {/* pay_slip */}
      {templates?.code_name === "pay_slip" && (
        <PaySlipForm control={control} watch={watch} setValue={setValue} />
      )}

      {/* purchase_order */}
      {templates?.code_name === "purchase_order" && (
        <PurchaseOrderForm
          control={control}
          watch={watch}
          setValue={setValue}
        />
      )}

      {/* {errors?.name && (
        <span className="text-sm text-red-500 font-medium mt-1 block">
          {errors?.name?.message}
        </span>
      )} */}
    </div>
  );
}
