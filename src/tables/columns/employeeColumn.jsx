import EmployeeAction from "../actions/EmoloyeeAction";

// Employee column
export const employeeColumn = [
  {
    accessorKey: "id",
    header: "Id",
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "country_code",
    header: "Country Code",
  },
  {
    accessorKey: "country_iso_code",
    header: "Country ISO Code",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span>
        {row?.original?.country_code} {row?.original?.phone}
      </span>
    ),
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <EmployeeAction row={row} />,
  },
];
