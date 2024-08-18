import { Avatar, Chip, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useGetBusinessProfileQuery } from "../app/features/profile/profileApi";
import BusinessProfileEditForm from "../components/BusinessProfileEditForm";
import ErrorScreen from "../components/common/ErrorScreen";
import CustomButton from "../components/common/LoadingButton";
import PageLoading from "../components/common/PageLoading";
import Layout from "../components/layout/Layout";

export default function BusinessProfile() {
  // states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  // redux elements
  const { userInfo, userCheckInfo } = useSelector((state) => state.auth);
  const { isLoading, isError, error, data } = useGetBusinessProfileQuery(
    `company/${userInfo?.uid}`
  );

  // business account === false then redirect to extended profile
  if (!userCheckInfo?.is_business_account) {
    return <Navigate to="/extended-profile" />;
  }
  return (
    <Layout title="Business Profile">
      {isLoading ? (
        <PageLoading />
      ) : isError ? (
        <ErrorScreen error={error?.error} />
      ) : (
        <section className="w-full h-full flex items-center justify-center px-8 py-3">
          <div className="shadow-md max-w-[680px] min-w-[360px] w-full p-6">
            {/* Avatar */}
            <div className="flex justify-between">
              <Avatar
                src={`data:image/*;base64,${data?.result?.data?.logo}`}
                alt="avatar"
                size="xl"
              />

              {/* modal */}
              <CustomButton
                className="h-10"
                color="blue"
                type="button"
                onClick={handleOpen}
                text={
                  <span className="flex items-center gap-3">
                    <MdEdit fontSize="1.1rem" /> Edit
                  </span>
                }
              />

              <Dialog
                open={open}
                // size="sm"
                handler={handleOpen}
                className="bg-white shadow-none rounded-none"
              >
                <DialogBody className="h-screen overflow-scroll">
                  <BusinessProfileEditForm
                    setOpen={setOpen}
                    profileData={data}
                  />
                </DialogBody>
              </Dialog>
            </div>

            {/* Business Name and ABN */}
            <div className="grid grid-cols-2 mt-5">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Business Name
                </p>
                <p className="text-gray-900 text-md font-semibold mt-1">
                  {data?.result?.data?.name}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Business ABN
                </p>
                <p className="text-gray-900 text-md font-semibold mt-1">
                  {data?.result?.data?.abn}
                </p>
              </div>
            </div>

            {/* Category */}
            <div className="mt-5">
              <p className="text-sm font-medium text-gray-500">Categories</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {data?.result?.data?.categories?.map((category) => (
                  <Chip
                    key={category?.id}
                    value={category?.name}
                    variant="ghost"
                    className="rounded-full mt-1 max-w-fit"
                  />
                ))}
              </div>
            </div>

            {/* Website URL */}
            <div className="mt-5">
              <p className="text-sm font-medium text-gray-500">Website URL</p>
              <p className="text-gray-900 text-md font-semibold mt-1">
                {data?.result?.data?.url}
              </p>
            </div>

            {/* Country and State */}
            <div className="grid grid-cols-2 mt-5">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  City or State
                </p>
                <p className="text-gray-900 text-md font-semibold mt-1">
                  {data?.result?.data?.city}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Country</p>
                <p className="text-gray-900 text-md font-semibold mt-1">
                  {data?.result?.data?.country}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="mt-5">
              <p className="text-sm font-medium text-gray-500">
                Business Address
              </p>
              <p className="text-gray-900 text-md font-semibold mt-1">
                {data?.result?.data?.business_address}
              </p>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
