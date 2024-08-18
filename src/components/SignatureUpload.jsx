import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Dialog, IconButton, Spinner } from "@material-tailwind/react";
import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdCloudUpload } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  useGetSignatureQuery,
  useUpdateSignatureMutation,
} from "../app/features/signature/signatureApi";
import { getBase64 } from "../helpers/getBase64";
import { signatureSchema } from "../utils/schema/signatureSchema";
import CustomButton from "./common/LoadingButton";

export default function SignatureUpload() {
  // states
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  // redux elements
  const { userInfo } = useSelector((state) => state.auth);
  const [updateSignature, { isLoading, isError, error, data }] =
    useUpdateSignatureMutation();
  const {
    isLoading: signatureLoading,
    isError: signatureIsError,
    isFetching: signatureIsFetching,
    error: signatureError,
    data: signatureData,
  } = useGetSignatureQuery({ params: { uid: userInfo?.uid } });

  // react hook form
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signatureSchema),
  });

  // file change and convert to base64
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        setImage(result);

        // set input value
        setValue("signature", result?.split(",")[1], {
          shouldValidate: true,
        });
      })
      .catch((err) => {
        cogoToast.error(err);
      });
  };

  // form submit
  const onSubmit = async (data) => {
    if (data) {
      const signatureData = {
        params: {
          uid: userInfo?.uid,
          ...data,
        },
      };

      await updateSignature(signatureData);
    }
  };

  // signature status
  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.error);
    }
    if (data?.result?.status_code === 200) {
      cogoToast.success(data?.result?.message);
      setImage(null);
      setOpen(false);
    }
  }, [isError, error, data, setOpen]);

  return (
    <>
      <div className="w-full ">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Signature <span className="text-red-600">*</span>
        </label>
        <div className="flex gap-2">
          <div className="relative border-2 flex items-center justify-center gap-3 border-dashed border-gray-400 w-full h-[150px] p-1">
            {signatureLoading || signatureIsFetching ? (
              <Spinner className="h-5 w-5" />
            ) : signatureIsError ? (
              <span className="text-xs text-red-500 font-medium block">
                {signatureError?.error}
              </span>
            ) : signatureData?.result?.signature ? (
              <Avatar
                src={`data:image/*;base64,${signatureData?.result?.signature}`}
                alt="signature"
                variant="square"
                size="xxl"
                className="w-full object-contain"
              />
            ) : (
              <div className="border flex justify-center items-center border-dashed border-gray-400 h-[120px] w-[180px] p-1">
                <span className="text-xs text-blue-gray-500 font-medium block">
                  Upload your signature
                </span>
              </div>
            )}

            <div className="absolute right-2 top-2">
              <IconButton
                color="blue-gray"
                className="rounded-full"
                type="button"
                size="lg"
                onClick={handleOpen}
              >
                <MdCloudUpload fontSize="1.6rem" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-white shadow-none rounded-none"
      >
        <div className="w-full h-full flex items-center justify-center p-5">
          <form className="w-full">
            <div
              className="border-2 flex items-center justify-center border-dashed cursor-pointer border-gray-400 w-full h-[150px] p-1"
              onClick={() => document.getElementById("file").click()}
            >
              {image ? (
                <Avatar
                  src={image}
                  alt="avatar"
                  variant="square"
                  size="xxl"
                  className="object-contain w-full"
                />
              ) : (
                <MdCloudUpload fontSize="3rem" />
              )}
            </div>

            {errors?.signature && (
              <span className="text-sm text-red-500 font-medium mt-1 block">
                {errors?.signature?.message}
              </span>
            )}

            <input
              type="file"
              id="file"
              hidden
              onChange={handleFileInputChange}
              accept="image/*"
            />

            <div className="mt-5">
              <CustomButton
                fullWidth={true}
                color="light-blue"
                type="button"
                isLoading={isLoading}
                disabled={isLoading}
                text={
                  <span className="flex items-center gap-2">
                    <MdCloudUpload fontSize="1.2rem" /> Upload Signature
                  </span>
                }
                className="h-11"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
}
