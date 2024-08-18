import dayjs from "dayjs";
import { JobAction } from "../actions/JobAction";

// Job column
export const jobColumn = [
  {
    accessorKey: "id",
    header: "Id",
  },

  {
    accessorKey: "title",
    header: "title",
  },
  {
    accessorKey: "vacancy",
    header: "Vacancy",
  },
  {
    accessorKey: "detail",
    header: "Details",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "salary",
    header: "Salary",
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => (
      <span>{dayjs(row?.original?.deadline).format("MMM D, YYYY")}</span>
    ),
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <JobAction row={row} />,
  },
];
