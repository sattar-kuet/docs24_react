import * as yup from "yup";

export const cvSchema = yup.object({
  cv: yup.string().required("CV is required"),
});
