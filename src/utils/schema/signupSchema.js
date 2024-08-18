import * as yup from "yup";

export const signupSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password should be at least 6 characters"),
  phone: yup
    .string()
    .required("Phone Number is Required!")

    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "invalid Phone Number"
    )
    .min(10, "Phone number must be at least 10 digit"),
  account_type: yup.string().required("Account type is required"),
  // position: yup.string().required("Position is required"),
});
