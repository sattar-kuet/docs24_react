import * as yup from "yup";

export const sendEmailSchema = yup.object({
  sender_date: yup.string().required("Date is required"),
  template_code: yup.string().required("Template is required"),
  contacts: yup.array().required("Contact is required"),
  bsb_invoice: yup.string().max(6, "BSB must be 6 characters"),

  delay: yup.number().typeError("Invalid Number"),
  annual_salary: yup.number().typeError("Invalid Number"),
  accrued1: yup.number().typeError("Invalid Number"),
  accrued2: yup.number().typeError("Invalid Number"),
  accrued3: yup.number().typeError("Invalid Number"),
  used1: yup.number().typeError("Invalid Number"),
  used2: yup.number().typeError("Invalid Number"),
  used3: yup.number().typeError("Invalid Number"),
  balance1: yup.number().typeError("Invalid Number"),
  balance2: yup.number().typeError("Invalid Number"),
  balance3: yup.number().typeError("Invalid Number"),
  pay_slip_account: yup.number().typeError("Invalid Number"),
  working_hours: yup.number().typeError("Invalid Number"),

  // the items is optional field but if the items has item then the inside fields are required
  items: yup
    .array()
    .of(
      yup.object().shape({
        item: yup.string().required("Item is required"),
        description: yup.string().required("Description is required"),
        quantity: yup
          .number()
          .required("Quantity is required")
          .typeError("Quantity is required"),
        unit_price: yup
          .number()
          .required("Unit Price is required")
          .typeError("Unit Price is required"),
        gst: yup.number().optional(),
      })
    )
    .optional(),
});
