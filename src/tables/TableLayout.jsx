import { Spinner } from "@material-tailwind/react";

import { flexRender } from "@tanstack/react-table";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import ReactPaginate from "react-paginate";

export default function TableLayout({
  isHeader,
  HeaderSearchComponent,
  HeaderButtonComponent,
  table,
  isFetching,
  productData,
}) {
  return (
    <div className="h-full w-full shadow-sm">
      <div className="relative overflow-x-auto w-full">
        {isHeader ? (
          <div className="flex justify-between gap-3 mb-4">
            {HeaderSearchComponent}
            {HeaderButtonComponent}
          </div>
        ) : null}

        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm font-medium text-gray-700 uppercase bg-gray-200">
            {table.getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers?.map((header) => (
                  <th
                    colSpan={header.colSpan}
                    key={header.id}
                    scope="col"
                    className="px-6 py-3 whitespace-nowrap last-of-type:text-center"
                  >
                    {header.isPlaceHolder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {isFetching ? (
            <tbody className="relative h-[400px]">
              <tr className="w-full absolute h-full flex items-center justify-center">
                <td>
                  <Spinner className="h-8 w-8" />
                </td>
              </tr>
            </tbody>
          ) : productData?.result?.total_counts < 1 ||
            productData?.result?.products?.length < 1 ? (
            <tbody className="relative h-[400px]">
              <tr className="w-full absolute h-full flex items-center justify-center">
                <td className="font-semibold text-lg text-gray-900">
                  Product not found!
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel()?.rows.map((row) => (
                <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
                  {row.getVisibleCells()?.map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <div className="w-full flex justify-between items-center px-6 py-5">
            <ReactPaginate
              breakLabel="..."
              nextLabel={<IoIosArrowForward />}
              previousLabel={<IoIosArrowBack />}
              onPageChange={(event) => table.setPageIndex(event.selected)}
              pageRangeDisplayed={4}
              pageCount={table.getPageCount()}
              renderOnZeroPageCount={null}
              className="flex gap-1"
              pageClassName="rounded w-[30px] h-[30px]"
              pageLinkClassName="w-full border rounded-full h-full flex justify-center items-center text-xs font-bold hover:bg-gray-200"
              nextClassName="w-[30px] h-[30px]"
              nextLinkClassName="border rounded-full border-gray-300 w-full h-full flex justify-center items-center text-lg font-semibold hover:bg-gray-200"
              previousClassName="w-[30px] h-[30px]"
              previousLinkClassName="border rounded-full border-gray-300 w-full h-full flex justify-center items-center text-lg font-semibold hover:bg-gray-200"
              activeClassName="w-[30px] h-[30px]"
              activeLinkClassName="w-full rounded-full border h-full flex justify-center items-center bg-gray-800 text-white text-xs font-bold hover:bg-gray-900"
              breakClassName="w-[26px] h-[30px]"
              breakLinkClassName="w-full h-full flex justify-center items-center text-lg font-semibold"
            />

            <div className="flex gap-3 items-center">
              <div className="flex gap-1 items-center">
                <span className="font-medium text-sm text-gray-700">
                  Listing per page
                </span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => table.setPageSize(Number(e.target.value))}
                  className="border border-gray-400 outline-none font-semibold text-sm text-gray-700"
                >
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((pageSize) => (
                    <option
                      className="font-medium text-sm text-gray-700"
                      key={pageSize}
                      value={pageSize}
                    >
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>

              <span className="font-medium text-sm text-gray-700">
                Showing{" "}
                <strong>{table.getState().pagination.pageIndex + 1} </strong>
                of <strong>{table.getPageCount()}</strong>
              </span>
            </div>
          </div>
        </CardFooter> */}
      </div>
    </div>
  );
}
