import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog } from "@material-tailwind/react";
import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { useSendEmailMutation } from "../app/features/email/emailApi";
import ContactFormCreate from "../components/ContactFormCreate";
import ContactSelect from "../components/ContactSelect";
import DateSelect from "../components/DateSelect";
import EmailTamplateSelect from "../components/EmailTemplateSelect";
import SignatureUpload from "../components/SignatureUpload";
import CustomButton from "../components/common/LoadingButton";
import Layout from "../components/layout/Layout";
import { sendEmailSchema } from "../utils/schema/sendEmailSchema";
import UploadAttachment from "../components/UploadAttachment";
import dayjs from "dayjs";

const SEND_EMAIL_DEFAULT_VALUES = {
  sender_date: "",
  template_code: "",
  client_name: "",
  project_address: "",
  client_aadress: "",
  effective_date: "",
  date_range: "",
  delay: 1,
  reference: "",
  employment: "",
  employment_basis: "",
  sub_total: 0,
  total_gst: 0,
  total: 0,
  working_hours: 0,
  annual_salary: 0,
  accrued1: 0,
  accrued2: 0,
  accrued3: 0,
  used1: 0,
  used2: 0,
  used3: 0,
  balance1: 0,
  balance2: 0,
  balance3: 0,
  pay_slip_account: 0,
  pay_slip_acc_name: "",
  pay_slip_ref: "",
  delivery_address: "",
  attention: "",
  telephone: "",
  delivery_instructions: "",
  account_name_invoice: "",
  bsb_invoice: "",
  create_invoice: false,
  subject: "",
  details: "",
  sender_degree: "",
  attachement: "",
  pay_frequency: "weekly",
};

export default function SendEmail() {
  // states
  const [open, setOpen] = useState(false);

  // dialog box handler
  const handleOpen = () => setOpen((cur) => !cur);

  // redux elements
  const { userInfo } = useSelector((state) => state.auth);
  const [sendEmail, { isLoading, isError, error, data }] =
    useSendEmailMutation();

  // react hook form
  const {
    register,
    setValue,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(sendEmailSchema),
    defaultValues: SEND_EMAIL_DEFAULT_VALUES,
  });

  // form submit
  const onSubmit = async (data) => {
    // map items and remove isGst field
    if (data?.items && data?.items?.length > 0) {
      data.items = data.items.map(
        ({ item, description, quantity, unit_price, gst }) => {
          return {
            item,
            description,
            quantity,
            unit_price,
            gst: gst || 0,
            amount: parseFloat(quantity) * parseFloat(unit_price),
          };
        }
      );
    }

    if (data) {
      const formatEffectedDate = dayjs(data?.sender_date).format("D MMMM YYYY");

      const emailData = {
        params: {
          ...data,
          uid: userInfo?.uid,
          effective_date: formatEffectedDate,
        },
      };

      await sendEmail(emailData);
    }
  };

  // send email status
  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.error);
    }
    if (data?.result?.status_code === 200) {
      cogoToast.success(data?.result?.message);
      reset(SEND_EMAIL_DEFAULT_VALUES);
    }
  }, [isError, error, data, reset]);

  useEffect(() => {
    // previous state
    const prevState = {
      contacts: watch("contacts"),
      template_code: watch("template_code"),
      attachement: watch("attachement"),
    };

    // reset dependent fields
    reset({ ...SEND_EMAIL_DEFAULT_VALUES, ...prevState });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("template_code")]);

  return (
    <Layout title="Send Email">
      <section className="h-full w-full flex items-start justify-center gap-2 px-4 ">
        <div className="max-w-[530px] w-full flex-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Search Email Address and Select */}
            <ContactSelect
              control={control}
              setValue={setValue}
              errors={errors}
            />
            {/* Email Tamplate Select */}
            <EmailTamplateSelect
              control={control}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
            {/* Select Date */}
            <DateSelect control={control} setValue={setValue} errors={errors} />

            {/* upload attachment */}
            <UploadAttachment setValue={setValue} />

            {/* Signature Upload */}
            <div className="flex justify-center mt-4">
              <SignatureUpload />
            </div>

            {errors?.name && (
              <span className="text-sm text-red-500 font-medium mt-1 block">
                {errors?.name?.message}
              </span>
            )}
            {/* Submit Button */}
            <CustomButton
              fullWidth={true}
              color="blue"
              type="submit"
              text="Send Mail"
              isLoading={isLoading}
              disabled={isLoading}
              className="mt-5"
            />
          </form>
        </div>

        <div className="mt-7">
          <CustomButton
            className="h-11"
            fullWidth={true}
            color="blue"
            type="button"
            onClick={handleOpen}
            text={
              <span className="flex items-center gap-1 ">
                <MdAdd fontSize="1.3rem" /> Add Contact
              </span>
            }
          />

          <Dialog
            size="sm"
            open={open}
            handler={handleOpen}
            className="bg-white shadow-none rounded-none"
          >
            <ContactFormCreate setOpen={setOpen} />
          </Dialog>
        </div>
      </section>
    </Layout>
  );
}
