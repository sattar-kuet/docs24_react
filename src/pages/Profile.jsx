import { Dialog } from "@material-tailwind/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useGetPersonalProfileQuery } from "../app/features/profile/profileApi";
import ProfileEditForm from "../components/ProfileEditForm";
import ErrorScreen from "../components/common/ErrorScreen";
import CustomButton from "../components/common/LoadingButton";
import PageLoading from "../components/common/PageLoading";
import Layout from "../components/layout/Layout";

export default function Profile() {
  // states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  // redux elements
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading, isError, error, data } = useGetPersonalProfileQuery(
    `/user/${userInfo?.uid}`
  );

  return (
    <Layout title="Profile">
      {isLoading ? (
        <PageLoading />
      ) : isError ? (
        <ErrorScreen error={error?.error} />
      ) : (
        <section className="w-full h-full flex items-center justify-center px-8 py-3">
          <div className="shadow-md max-w-[680px] min-w-[360px] w-full p-6">
            {/* Avatar */}
            <div className="flex justify-between">
              <div></div>
              <CustomButton
                color="blue"
                type="button"
                onClick={handleOpen}
                text={
                  <span className="flex items-center gap-3">
                    <MdEdit fontSize="1.1rem" /> Edit
                  </span>
                }
                className="h-10"
              />

              <Dialog
                open={open}
                size="sm"
                handler={handleOpen}
                className="bg-white shadow-none rounded-none"
              >
                <ProfileEditForm setOpen={setOpen} profileData={data} />
              </Dialog>
            </div>

            {/* Business Name and ABN */}
            <div className="grid grid-cols-2 mt-5">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-gray-900 text-md font-semibold mt-1">
                  {data?.result?.user?.name}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-900 text-md font-semibold mt-1">
                  {data?.result?.user?.email}
                </p>
              </div>
            </div>

            {/* Position */}
            {/* <div className="mt-5">
              <p className="text-sm font-medium text-gray-500">Position</p>
              <Chip
                value="Manager"
                className="rounded-full mt-1 max-w-fit bg-gray-800"
              />
            </div> */}

            {/* Phone */}
            <div className="mt-5">
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-gray-900 text-md font-semibold mt-1">
                {data?.result?.user?.country_code} {data?.result?.user?.phone}
              </p>
            </div>

            {/* Country and State */}
            {/* <div className="grid grid-cols-2 mt-5">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  City or State
                </p>
                <p className="text-gray-900 text-md font-semibold mt-1">
                  State
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Country</p>
                <p className="text-gray-900 text-md font-semibold mt-1">
                  Country
                </p>
              </div>
            </div> */}

            {/* Address */}
            {/* <div className="mt-5">
              <p className="text-sm font-medium text-gray-500">
                Business Address
              </p>
              <p className="text-gray-900 text-md font-semibold mt-1">
                Business Address
              </p>
            </div> */}
          </div>
        </section>
      )}
    </Layout>
  );
}
