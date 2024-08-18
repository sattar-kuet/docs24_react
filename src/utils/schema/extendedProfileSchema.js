import * as yup from "yup";

export const extendProfileSchema = yup.object({
  country_name: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  business_address: yup.string().required("Business address is required"),
  logo: yup.string().required("Logo is required"),
});
