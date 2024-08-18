import CommonInputField from "./common/CommonInputField";

const CommonMailClientAddressForm = ({ control }) => {
  const formData = [
    {
      name: "client_name",
      type: "text",
      label: "Client Name",
      required: true,
      placeholder: "Enter Client Name",
    },
    {
      name: "client_aadress",
      type: "text",
      label: "Client Address",
      required: true,
      placeholder: "Enter Client Address",
    },
    {
      name: "delay",
      type: "number",
      label: "Due Date in Days ex. 5",
      required: true,
      placeholder: "Due Date in Days ex. 5",
    },
    {
      name: "reference",
      type: "text",
      label: "Reference",
      required: true,
      placeholder: "Reference",
    },
  ];

  return <CommonInputField formData={formData} control={control} />;
};

export default CommonMailClientAddressForm;
