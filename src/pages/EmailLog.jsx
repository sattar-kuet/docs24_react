import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useGetEmailLogQuery } from "../app/features/email/emailApi";
import ErrorScreen from "../components/common/ErrorScreen";
import PageLoading from "../components/common/PageLoading";
import Layout from "../components/layout/Layout";
import TableLayout from "../tables/TableLayout";
import { emailLogColumn } from "../tables/columns/emailLogColumn";
import CustomButton from "../components/common/LoadingButton";
import { MdClose } from "react-icons/md";

export default function EmailLog({ title }) {
  // states
  const [searchQuery, setSearchQuery] = useState("");

  // redux elements
  const { userInfo } = useSelector((state) => state.auth);

  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: emailLogData,
  } = useGetEmailLogQuery({
    params: {
      uid: userInfo?.uid,
      search_query: searchQuery,
    },
  });

  // React table elements
  const data = useMemo(
    () => (emailLogData?.result?.logs ? emailLogData?.result?.logs : []),
    [emailLogData?.result]
  );
  // columns
  const columns = useMemo(() => emailLogColumn, []);

  // table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: {
        id: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Layout title={title}>
      {isLoading ? (
        <PageLoading />
      ) : isError ? (
        <ErrorScreen error={error?.error} />
      ) : (
        <div>
          {/* search email log */}
          <div className="border mb-1 border-gray-300 flex items-center h-[42px] hover:border-gray-500 transition-all duration-300">
            <input
              type="text"
              className="text-gray-900 text-sm font-normal outline-none w-full h-full px-3"
              placeholder="Enter email to search"
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
            />

            <CustomButton
              type="button"
              text={<MdClose />}
              disabled={!searchQuery}
              onClick={() => setSearchQuery("")}
              className="h-full px-3"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Email Logs
          </h3>

          {/* TABLE */}
          {emailLogData?.result?.logs?.length > 0 ? (
            <TableLayout table={table} isFetching={isFetching} data={data} />
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-gray-500 ">No email logs found</p>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}
