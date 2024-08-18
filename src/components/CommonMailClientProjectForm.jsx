import CommonInputField from "./common/CommonInputField";

const CommonMailClientProjectForm = ({ control }) => {
  const formData = [
    {
      type: "text",
      name: "subject",
      label: "Write Email Subject",
      placeholder: "Enter Email Subject",
      required: true,
    },
    {
      type: "text",
      name: "details",
      label: "Write Email Body",
      placeholder: "Enter Email Body",
      required: true,
    },
    {
      type: "text",
      name: "sender_degree",
      label: "Write Sender Degree",
      placeholder: "Enter Sender Degree",
      required: true,
    },
  ];

  return <CommonInputField formData={formData} control={control} />;
};

export default CommonMailClientProjectForm;
