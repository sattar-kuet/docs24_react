import { Dialog } from "@material-tailwind/react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { useGetEmployeeListQuery } from "../app/features/employee/employeeApi";
import EmployeeCreateForm from "../components/EmployeeCreateForm";
import ErrorScreen from "../components/common/ErrorScreen";
import CustomButton from "../components/common/LoadingButton";
import PageLoading from "../components/common/PageLoading";
import Layout from "../components/layout/Layout";
import TableLayout from "../tables/TableLayout";
import { employeeColumn } from "../tables/columns/employeeColumn";

export default function EmployeeList() {
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
    data: employeeData,
  } = useGetEmployeeListQuery({ params: { uid: userInfo?.uid } });

  // React table elements
  const data = useMemo(
    () => (employeeData?.result?.data ? employeeData?.result?.data : []),
    [employeeData?.result]
  );
  const columns = useMemo(() => employeeColumn, []);

  // table instance
  const table = useReactTable({
    data,
    columns,

    state: {
      columnVisibility: {
        id: false,
        country_code: false,
        country_iso_code: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Layout title="Employee Management">
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
                <EmployeeCreateForm setOpen={setOpen} />
              </Dialog>
            </>
          }
        />
      )}
    </Layout>
  );
}
