import { Dialog } from "@material-tailwind/react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { useGetContactListQuery } from "../app/features/contact/contactApi";
import ContactFormCreate from "../components/ContactFormCreate";
import ErrorScreen from "../components/common/ErrorScreen";
import CustomButton from "../components/common/LoadingButton";
import PageLoading from "../components/common/PageLoading";
import Layout from "../components/layout/Layout";
import TableLayout from "../tables/TableLayout";
import { contactColumn } from "../tables/columns/contactColumn";

export default function ContactList() {
  // states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  // redux elements
  const { userInfo } = useSelector((state) => state.auth);
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: contactData,
  } = useGetContactListQuery({ params: { uid: userInfo?.uid } });

  // React table elements
  const data = useMemo(
    () => (contactData?.result?.data ? contactData?.result?.data : []),
    [contactData?.result]
  );
  const columns = useMemo(() => contactColumn, []);
  // const pagination = useMemo(
  //   () => ({ pageIndex, pageSize }),
  //   [pageIndex, pageSize]
  // );

  // table instance
  const table = useReactTable({
    data,
    columns,
    // pageCount: Math.ceil(productData?.result?.total_counts / pageSize) || 1,
    state: {
      columnVisibility: {
        id: false,
        country_code: false,
        country_iso_code: false,
      },
      // pagination,
    },
    // onPaginationChange: setPagination,
    // manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Layout title="Contact Management">
      {isLoading ? (
        <PageLoading />
      ) : isError ? (
        <ErrorScreen error={error?.error} />
      ) : (
        <TableLayout
          table={table}
          isFetching={isFetching}
          data={data}
          isHeader={true}
          HeaderSearchComponent={<div></div>}
          HeaderButtonComponent={
            <>
              <CustomButton
                color="blue"
                type="submit"
                text={
                  <span className="flex items-center gap-1">
                    <MdAdd fontSize="1.2rem" /> Add New
                  </span>
                }
                className="h-10"
                onClick={handleOpen}
              />
              <Dialog
                size="sm"
                open={open}
                handler={handleOpen}
                className="bg-white shadow-none rounded-none"
              >
                <ContactFormCreate setOpen={setOpen} />
              </Dialog>
            </>
          }
        />
      )}
    </Layout>
  );
}
