import CommonInputField from "./common/CommonInputField";
import CommonMailClientAddressForm from "./CommonMailClientAddressForm";
import GST_CalculationFields from "./GST_CalculationFields";

const InvoiceForm = ({ control, watch, setValue }) => {
  const extraInfoFormData = [
    {
      label: "Account Name",
      name: "pay_slip_acc_name",
      type: "text",
      placeholder: "Enter Account Name",
    },
    {
      label: "BSB",
      name: "bsb_invoice",
      type: "text",
      placeholder: "Enter BSB",
    },
    {
      label: "Account Number",
      name: "pay_slip_account",
      type: "number",
      placeholder: "Enter Account Number",
    },
  ];

  return (
    <div>
      <CommonMailClientAddressForm control={control} />

      <GST_CalculationFields
        control={control}
        watch={watch}
        setValue={setValue}
      />

      <div className="grid grid-cols-2 gap-1">
        <CommonInputField control={control} formData={extraInfoFormData} />
      </div>
    </div>
  );
};

export default InvoiceForm;
