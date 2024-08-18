import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password should be at least 6 characters"),
});
