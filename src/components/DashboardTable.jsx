// import { PencilIcon } from "@heroicons/react/24/solid";
// import {
//   Button,
//   CardFooter,
//   IconButton,
//   Tooltip,
//   Typography,
// } from "@material-tailwind/react";

// const TABLE_HEAD = ["Subject", "Sent to", "Sent At", "Action"];

// const TABLE_ROWS = [
//   {
//     img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
//     name: "Spotify",
//     amount: "$2,500",
//     date: "Wed 3:00pm",
//     status: "paid",
//     account: "visa",
//     accountNumber: "1234",
//     expiry: "06/2026",
//   },
//   {
//     img: "https://docs.material-tailwind.com/img/logos/logo-amazon.svg",
//     name: "Amazon",
//     amount: "$5,000",
//     date: "Wed 1:00pm",
//     status: "paid",
//     account: "master-card",
//     accountNumber: "1234",
//     expiry: "06/2026",
//   },
//   {
//     img: "https://docs.material-tailwind.com/img/logos/logo-pinterest.svg",
//     name: "Pinterest",
//     amount: "$3,400",
//     date: "Mon 7:40pm",
//     status: "pending",
//     account: "master-card",
//     accountNumber: "1234",
//     expiry: "06/2026",
//   },
//   {
//     img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
//     name: "Google",
//     amount: "$1,000",
//     date: "Wed 5:00pm",
//     status: "paid",
//     account: "visa",
//     accountNumber: "1234",
//     expiry: "06/2026",
//   },
//   {
//     img: "https://docs.material-tailwind.com/img/logos/logo-netflix.svg",
//     name: "netflix",
//     amount: "$14,000",
//     date: "Wed 3:30am",
//     status: "cancelled",
//     account: "visa",
//     accountNumber: "1234",
//     expiry: "06/2026",
//   },
// ];

// export default function DashboardTable() {
//   return (
//     <div className="h-full w-full shadow-lg">
//       <table className="w-full min-w-max table-auto overflow-auto text-left">
//         <thead>
//           <tr>
//             {TABLE_HEAD.map((head) => (
//               <th
//                 key={head}
//                 className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4"
//               >
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-semibold leading-none opacity-90"
//                 >
//                   {head}
//                 </Typography>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {TABLE_ROWS.map(({ name, date }, index) => {
//             const isLast = index === TABLE_ROWS.length - 1;
//             const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

//             return (
//               <tr key={name}>
//                 <td className={classes}>
//                   {" "}
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-normal"
//                   >
//                     {name}
//                   </Typography>
//                 </td>
//                 <td className={classes}>
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-normal"
//                   >
//                     sent@mail.com
//                   </Typography>
//                 </td>
//                 <td className={classes}>
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-normal"
//                   >
//                     {date}
//                   </Typography>
//                 </td>

//                 <td className={classes}>
//                   <Tooltip content="Edit User">
//                     <IconButton variant="text" className="rounded-full">
//                       <PencilIcon className="h-4 w-4" />
//                     </IconButton>
//                   </Tooltip>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
//         <Button variant="outlined" size="sm">
//           Previous
//         </Button>
//         <div className="flex items-center gap-2">
//           <IconButton variant="outlined" size="sm">
//             1
//           </IconButton>
//           <IconButton variant="text" size="sm">
//             2
//           </IconButton>
//           <IconButton variant="text" size="sm">
//             3
//           </IconButton>
//           <IconButton variant="text" size="sm">
//             ...
//           </IconButton>
//           <IconButton variant="text" size="sm">
//             8
//           </IconButton>
//           <IconButton variant="text" size="sm">
//             9
//           </IconButton>
//           <IconButton variant="text" size="sm">
//             10
//           </IconButton>
//         </div>
//         <Button variant="outlined" size="sm">
//           Next
//         </Button>
//       </CardFooter>
//     </div>
//   );
// }
