import * as yup from "yup";

export const signatureSchema = yup.object({
  signature: yup.string().required("Signature image is required"),
});
