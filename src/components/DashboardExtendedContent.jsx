import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import { useGetJobListQuery } from "../app/features/job/jobApi";
import TableLayout from "../tables/TableLayout";
import { jobColumn } from "../tables/columns/jobColumn";
import ErrorScreen from "./common/ErrorScreen";
import PageLoading from "./common/PageLoading";
import Layout from "./layout/Layout";

export default function DashboardExtendedContent() {
  // redux elements
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: jobData,
  } = useGetJobListQuery();

  // React table elements
  const data = useMemo(
    () => (jobData?.result?.jobs ? jobData?.result?.jobs : []),
    [jobData?.result]
  );
  // columns
  const columns = useMemo(() => jobColumn, []);

  // table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: {
        id: false,
        detail: false,
        location: false,
        salary: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Layout title="Dashboard">
      {isLoading ? (
        <PageLoading />
      ) : isError ? (
        <ErrorScreen error={error?.error} />
      ) : (
        <TableLayout table={table} isFetching={isFetching} data={data} />
      )}
    </Layout>
  );
}
