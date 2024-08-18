import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Chip,
  DialogBody,
  DialogHeader,
  Spinner,
} from "@material-tailwind/react";
import cogoToast from "cogo-toast";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidStopwatch } from "react-icons/bi";
// import { FaMoneyBill1Wave } from "react-icons/fa6";
import { convertHtmlToReact } from "@hedgedoc/html-to-react";
import { MdLocationPin } from "react-icons/md";
import { PiOfficeChairFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import {
  useApplyjobMutation,
  useGetJobDetailsQuery,
} from "../app/features/job/jobApi";
import { cvSchema } from "../utils/schema/cvSchema";
import CvUpload from "./CvUpload";
import CustomButton from "./common/LoadingButton";

export default function JobDetails({ row }) {
  // states
  const [isApply, setIsApply] = useState(false);

  // redux elements
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading, isError, error, data } = useGetJobDetailsQuery(
    `/job/detail/${row?.original?.id}`
  );

  const [
    applyjob,
    {
      isLoading: applyIsLoading,
      isError: applyIsError,
      error: applyError,
      data: applyData,
    },
  ] = useApplyjobMutation();

  // react hook form
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(cvSchema),
  });

  // form submit
  const onSubmit = async (data) => {
    if (data) {
      const applyData = {
        params: {
          job_id: row?.original?.id,
          uid: userInfo?.uid,
          ...data,
        },
      };

      await applyjob(applyData);
    }
  };

  useEffect(() => {
    if (applyIsError) {
      cogoToast.error(applyError?.error);
    }
    if (applyData?.result?.status && applyData?.result?.message) {
      cogoToast.success(applyData?.result?.message);
      setIsApply(false);
    }
    if (!applyData?.result?.status && applyData?.result?.message) {
      cogoToast.warn(applyData?.result?.message);
      setIsApply(false);
    }
  }, [applyIsError, applyError, applyData]);

  return isLoading ? (
    <section className="w-full h-[75vh] flex justify-center items-center bg-white/30 backdrop-blur-md">
      <Spinner className="h-8 w-8" />
    </section>
  ) : isError ? (
    <section className="w-full h-[75vh] flex justify-center items-center bg-white/30 backdrop-blur-md">
      <span className="text-sm text-red-500 font-medium block">
        {error?.error}
      </span>
    </section>
  ) : (
    <>
      <DialogHeader>Job Details</DialogHeader>
      <DialogBody className="pt-0">
        <h2 className="text-xl font-semibold">{data?.result?.data?.title}</h2>
        {data?.result?.data?.applied ? (
          <div className="flex flex-wrap mt-1">
            <Chip
              value="Applied"
              color="green"
              clasName="rounded-full mt-1 max-w-fit"
            />
          </div>
        ) : null}
        <div className="flex gap-5 mt-4">
          <div className="flex items-center gap-1">
            <PiOfficeChairFill fontSize="1.2rem" />
            <span className="font-medium ">{data?.result?.data?.vacancy}</span>
          </div>

          <div className="flex items-center gap-1">
            <MdLocationPin fontSize="1.2rem" />
            <span className="font-medium ">{data?.result?.data?.location}</span>
          </div>

          {/* <div className="flex items-center gap-1">
            <FaMoneyBill1Wave fontSize="1.2rem" />
            <span className="font-medium ">{data?.result?.data?.salary}</span>
          </div> */}

          <div className="flex items-center gap-1">
            <BiSolidStopwatch fontSize="1.2rem" />
            <span className="font-medium ">
              {dayjs(data?.result?.data?.deadline).format("MMM D, YYYY")}
            </span>
          </div>
        </div>

        <div className="my-6 job__details">
          {convertHtmlToReact(data?.result?.data?.detail)}
        </div>

        {!data?.result?.data?.applied ? (
          <CustomButton
            color="pink"
            type="submit"
            text="Apply"
            className={`h-10 w-[90px] text-xs rounded-md mt-4 ${
              isApply ? "hidden" : "visible"
            }`}
            onClick={() => setIsApply(true)}
          />
        ) : null}
        {/* apply modal */}
        {isApply ? (
          <form onSubmit={handleSubmit(onSubmit)} className="border p-5 mt-6">
            <div className="w-full flex items-center justify-center">
              <div>
                <h2 className="text-lg font-semibold text-center">Upload CV</h2>

                {/* Signature Upload */}
                <div className="flex w-full justify-center mt-4">
                  <CvUpload setValue={setValue} errors={errors} />
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-center justify-center mt-6">
              <Button
                color="red"
                className="h-10 text-xs rounded-md"
                onClick={() => setIsApply(false)}
              >
                <span>Cancel</span>
              </Button>
              <CustomButton
                color="green"
                type="submit"
                isLoading={applyIsLoading}
                disabled={applyIsLoading}
                text="Apply"
                className="h-10 w-[90px] text-xs rounded-md"
              />
            </div>
          </form>
        ) : null}
      </DialogBody>
    </>
  );
}
