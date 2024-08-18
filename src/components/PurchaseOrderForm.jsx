import CommonInputField from "./common/CommonInputField";
import CommonMailClientAddressForm from "./CommonMailClientAddressForm";
import GST_CalculationFields from "./GST_CalculationFields";

const PurchaseOrderForm = ({ control, watch, setValue }) => {
  const extraInfoFormData = [
    // Delivery Details
    {
      type: "heading",
      label: "Delivery Details",
      className: "mt-5 bg-gray-100 p-2 col-span-2",
    },
    {
      label: "Delivery Address",
      name: "delivery_address",
      type: "text",
      placeholder: "Enter Delivery Address",
    },
    {
      label: "Attention",
      name: "attention",
      type: "text",
      placeholder: "Enter Attention",
    },
    {
      label: "Telephone",
      name: "telephone",
      type: "text",
      placeholder: "Enter Telephone",
    },
    {
      label: "Delivery Instructions",
      name: "delivery_instructions",
      type: "text",
      placeholder: "Delivery Instructions",
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

export default PurchaseOrderForm;
