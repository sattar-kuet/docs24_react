import ContactAction from "../actions/ContactAction";

// Contact column
export const contactColumn = [
  {
    accessorKey: "id",
    header: "Id",
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "company_name",
    header: "Company Name",
  },
  {
    accessorKey: "email",
    header: "Email",
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
    cell: ({ row }) => <ContactAction row={row} />,
  },
];
