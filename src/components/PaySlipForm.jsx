import { useEffect } from "react";
import CommonInputField from "./common/CommonInputField";

const PaySlipForm = ({ control, watch, setValue }) => {
  const formData = [
    {
      name: "client_name",
      type: "text",
      label: "Employee Name",
      placeholder: "Enter Employee Name",
    },
    {
      name: "client_aadress",
      type: "text",
      label: "Company Address",
      placeholder: "Enter Company Address",
    },

    // paid by
    {
      type: "heading",
      label: "Paid by",
      className: "mt-5 bg-gray-100 p-2 col-span-2",
    },
    {
      name: "",
      type: "text",
      label: "Company Name",
      placeholder: "Enter Company Name",
      disableMargin: true,
    },
    {
      name: "project_address",
      type: "text",
      label: "Company Address",
      placeholder: "Enter Company Address",
      disableMargin: true,
    },

    // employee details
    {
      type: "heading",
      label: "Employee Details",
      className: "mt-5 bg-gray-100 p-2 col-span-2",
    },
    {
      name: "pay_frequency",
      label: "Pay Frequency",
      type: "radio",
      options: [
        { label: "Weekly", value: "weekly" },
        { label: "Forth Nightly", value: "ForthNightly" },
      ],
    },
    {
      type: "number",
      label: "Working hours",
      name: "working_hours",
      placeholder: "Working hours",
    },

    // pay period
    {
      type: "heading",
      label: "Pay Period",
      className: "mt-5 bg-gray-100 p-2 col-span-2",
    },
    {
      label: "Date Range",
      type: "date-picker",
      name: "date_range",
      asSingle: false,
      useRange: true,
      className: "col-span-2",
    },
    {
      name: "annual_salary",
      label: "Annual Salary",
      type: "number",
    },
    {
      name: "employment",
      label: "Employment",
      type: "select",
      options: [
        { label: "Full Time", value: "Full Time" },
        { label: "Part Time", value: "Part Time" },
      ],
    },
    {
      name: "employment_basis",
      label: "Employment",
      type: "select",
      options: [
        { label: "Temporary", value: "Temporary" },
        { label: "Casual", value: "Casual" },
      ],
    },

    // Annual leave in hours
    {
      type: "heading",
      label: "Annual Leave in Hours",
      className: "mt-5 bg-gray-100 p-2 col-span-2",
    },
    {
      name: "accrued1",
      label: "Accrued",
      type: "number",
      placeholder: "Accrued",
    },
    {
      name: "used1",
      label: "Used",
      type: "number",
      placeholder: "Used",
    },
    {
      name: "balance1",
      label: "Balance",
      type: "number",
      placeholder: "Balance",
    },

    // compassionate leave (paid in hours)
    {
      type: "heading",
      label: "Compassionate leave (paid in hours)",
      className: "mt-5 bg-gray-100 p-2 col-span-2",
    },
    {
      name: "accrued2",
      label: "Accrued",
      type: "number",
      placeholder: "Accrued",
    },
    {
      name: "used2",
      label: "Used",
      type: "number",
      placeholder: "Used",
    },
    {
      name: "balance2",
      label: "Balance",
      type: "number",
      placeholder: "Balance",
    },

    // Personal/carer's leave in hours
    {
      type: "heading",
      label: "Personal/carer's leave in hours",
      className: "mt-5 bg-gray-100 p-2 col-span-2",
    },
    {
      name: "accrued3",
      label: "Accrued",
      type: "number",
      placeholder: "Accrued",
    },
    {
      name: "used3",
      label: "Used",
      type: "number",
      placeholder: "Used",
    },
    {
      name: "balance3",
      label: "Balance",
      type: "number",
      placeholder: "Balance",
    },

    // Payment Details
    {
      type: "heading",
      label: "Payment Details",
      className: "mt-5 bg-gray-100 p-2 col-span-2",
    },
    {
      type: "number",
      label: "Account No:",
      placeholder: "Enter Account No",
      name: "pay_slip_account",
    },
    {
      type: "text",
      label: "Account Name:",
      placeholder: "Enter Account Name",
      name: "pay_slip_acc_name",
    },
    {
      type: "text",
      label: "Reference",
      placeholder: "Reference",
      name: "pay_slip_ref",
    },
  ];

  // modify date range value
  useEffect(() => {
    if (watch("date_range")) {
      const { startDate, endDate } = watch("date_range");
      setValue("date_range", `${startDate}-${endDate}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("date_range")]);

  return (
    <div className="grid grid-cols-2 gap-1">
      <CommonInputField control={control} formData={formData} />
    </div>
  );
};

export default PaySlipForm;
