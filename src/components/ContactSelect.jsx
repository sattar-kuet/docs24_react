import { Card, CardBody } from "@material-tailwind/react";
import { useEffect, useMemo } from "react";
import { Controller, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from "react-tailwindcss-select";
import {
  useGetContactsByIdQuery,
  useGetContactsQuery,
} from "../app/features/contact/contactApi";

export default function ContactSelect({ control, setValue, errors }) {
  // find the input array
  const contacts = useWatch({ control, name: "contacts" });
  const contact_ids = useWatch({ control, name: "contact_ids" });

  // redux elements
  const { userInfo } = useSelector((state) => state.auth);
  const {
    isLoading,
    isError,
    error,
    data: contactData,
  } = useGetContactsQuery({ params: { uid: userInfo?.uid } });
  const {
    isLoading: contactIsLoading,
    isFetching: contactIsFetching,
    isError: contactIsError,
    error: contactError,
    data,
  } = useGetContactsByIdQuery({
    params: { id: contacts?.length > 0 ? contact_ids : [] },
  });

  // set the contact id from contacts array
  useEffect(() => {
    if (contacts?.length > 0) {
      setValue(
        "contact_ids",
        contacts?.map((contact) => contact?.value),
        {
          shouldValidate: true,
        }
      );
    }
  }, [contacts, setValue]);

  // prepare contact select options
  const options = useMemo(() => {
    if (contactData?.result?.data?.length > 0) {
      return contactData?.result?.data?.map((contact) => {
        return { label: contact?.value, value: contact?.id };
      });
    } else {
      return [{ label: "None", value: null, disabled: true }];
    }
  }, [contactData?.result?.data]);

  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Select Contact <span className="text-red-600">*</span>
      </label>

      <Controller
        name="contacts"
        id="contacts"
        control={control}
        render={({ field: { ref, ...rest } }) => {
          return (
            <Select
              {...rest}
              inputRef={ref}
              placeholder={"Select contact email"}
              options={options}
              isClearable={true}
              isMultiple={true}
              isDisabled={isError}
              isSearchable={true}
              loading={isLoading || contactIsLoading || contactIsFetching}
              classNames={{
                menuButton: ({ isDisabled }) =>
                  `flex items-center justify-between min-h-[44px] text-sm text-gray-500 font-medium border border-gray-300 transition-all duration-300 outline-none focus:outline-none ${
                    isDisabled
                      ? "bg-gray-200"
                      : "bg-gray-100 hover:border-gray-500"
                  }`,

                menu: "absolute z-10 w-full bg-gray-50 shadow-lg py-3 mt-1 text-sm text-gray-800",

                listItem: ({ isSelected }) =>
                  `block transition duration-200 px-3 py-2 cursor-pointer select-none truncate ${
                    isSelected
                      ? `text-white bg-blue-500`
                      : `text-gray-800 font-medium hover:bg-blue-100 hover:text-blue-600`
                  }`,
              }}
            />
          );
        }}
      />

      {isError && (
        <span className="text-sm text-red-500 font-medium mt-2 block text-left">
          {error?.error}
        </span>
      )}

      {errors?.contacts && (
        <span className="text-sm text-red-500 font-medium mt-1 block">
          {errors?.contacts?.message}
        </span>
      )}

      {/* contact details */}
      {data?.result?.data?.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 mt-3 mb-6 w-full">
          {data?.result?.data?.map((contact) => (
            <Card className="shadow-xl" key={contact?.id}>
              <CardBody className="min-h-[100px] p-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">Name :</span>
                  <span className="font-medium text-xs text-gray-800">
                    {contact?.name}
                  </span>
                </div>
                <div className="flex items-start gap-2 mt-2">
                  <span className="text-xs font-semibold text-nowrap">
                    Email :
                  </span>
                  <span className="font-medium text-xs text-gray-800 break-all">
                    {contact?.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-semibold">Phone :</span>
                  <span className="font-medium text-xs text-gray-800">
                    {contact?.phone}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-semibold">Co. Name :</span>
                  <span className="font-medium text-xs text-gray-800">
                    {contact?.company_name}
                  </span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : null}

      {contactIsError && (
        <span className="text-sm text-red-500 font-medium mt-2 block text-left">
          {contactError?.error}
        </span>
      )}
    </>
  );
}
