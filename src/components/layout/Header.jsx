// import { BiSolidUserCircle } from "react-icons/bi";
import { IconButton } from "@material-tailwind/react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import ProfileMenu from "./ProfileMenu";
// import { userLoggedOut } from "../../app/features/auth/authSlice";

export default function Header({ openSidebar, setOpenSidebar, title }) {
  return (
    <header className="sticky top-0 z-20 w-full h-[55px] lg:h-[70px] px-3 lg:px-5 flex items-center justify-between bg-white border-b border-gray-200">
      {/* sidebar button */}
      <div className="flex items-center gap-3">
        <IconButton
          variant="text"
          className="inline-flex items-center p-2 text-sm text-gray-700 rounded-lg md:hidden hover:bg-gray-100"
          type="button"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <span className="sr-only">Open sidebar</span>
          <HiOutlineMenuAlt2 fontSize="1.5rem" />
        </IconButton>

        <h2 className="text-[18px] font-medium">{title}</h2>
      </div>

      {/* dropdown menu */}
      <ProfileMenu />
    </header>
  );
}
