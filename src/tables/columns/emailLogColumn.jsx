import dayjs from "dayjs";
import { EmailLogAction } from "../actions/EmailLogAction";

// Email log column
export const emailLogColumn = [
  {
    accessorKey: "id",
    header: "Id",
  },

  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "receiver_email",
    header: "Receive Email",
  },

  {
    accessorKey: "time",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-center block py-2">
        {dayjs(row?.original?.time).format("MMM D, YYYY")}
      </span>
    ),
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <EmailLogAction row={row} />,
  },

  // {
  //   accessorKey: "action",
  //   header: "Action",
  //   cell: ({ row }) => <JobAction row={row} />,
  // },
];
