import * as yup from "yup";

export const businessProfileSchema = yup.object({
  business_name: yup.string().required("Business name is required"),
  website: yup.string().required("Website is required"),
  categories: yup.array().required("Category is required"),
  country_name: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  business_address: yup.string().required("Business address is required"),
  logo: yup.string().required("Logo is required"),
  abn: yup
    .number("Business abn must be a number")
    .typeError("Business abn must be a number")
    .required("Business abn is required"),
});
