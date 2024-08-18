import { IconButton } from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";
import { FaChalkboardUser } from "react-icons/fa6";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoMdSend } from "react-icons/io";
import { MdDashboard, MdEmail, MdVerifiedUser } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";
import { RiShieldUserFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import IT_SCHOLAR_Logo from "../../assets/ITSCHOLAR-logo.png";
import Logo from "./Logo";

export default function Sidebar({ openSidebar, setOpenSidebar }) {
  // redux elements
  const { userCheckInfo } = useSelector((state) => state.auth);
  return (
    <aside
      className={`${
        openSidebar ? "" : "-translate-x-full"
      } fixed top-0 left-0 z-30 w-full max-w-[16rem] h-screen py-5 px-3 transition-transform bg-white shadow-xl shadow-blue-gray-100 rounded-none md:translate-x-0`}
    >
      <nav className="h-full px-2 bg-white">
        <div className="flex items-center justify-between gap-3">
          {/* logo */}
          <NavLink to="/">
            <Logo />
          </NavLink>

          <IconButton
            variant="text"
            className="inline-flex items-center p-2 text-sm text-gray-700 rounded-lg md:hidden hover:bg-gray-100"
            type="button"
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            <span className="sr-only">Close sidebar</span>
            <AiOutlineClose fontSize="1.5rem" />
          </IconButton>
        </div>

        <div className="h-full flex flex-col justify-between py-[35px]">
          {/* nav item */}
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-blue-400 text-white" : ""
                  } flex items-center p-3 gap-3 rounded-md text-gray-800 duration-200 hover:bg-blue-400 hover:text-white`
                }
              >
                <MdDashboard fontSize="1.5rem" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-blue-400 text-white" : ""
                  } flex items-center p-3 gap-3 rounded-md text-gray-800 duration-200 hover:bg-blue-400 hover:text-white`
                }
              >
                <MdVerifiedUser fontSize="1.5rem" />
                <span>Profile</span>
              </NavLink>
            </li>

            {userCheckInfo?.is_business_account ? (
              <li>
                <NavLink
                  to="/business-profile"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-blue-400 text-white" : ""
                    } flex items-center p-3 gap-3 rounded-md text-gray-800 duration-200 hover:bg-blue-400 hover:text-white`
                  }
                >
                  <FaChalkboardUser fontSize="1.5rem" />
                  <span>Business Profile</span>
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/extended-profile"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-blue-400 text-white" : ""
                      } flex items-center p-3 gap-3 rounded-md text-gray-800 duration-200 hover:bg-blue-400 hover:text-white`
                    }
                  >
                    <RiShieldUserFill fontSize="1.5rem" />
                    <span>Extended Profile</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/email-log"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-blue-400 text-white" : ""
                      } flex items-center p-3 gap-3 rounded-md text-gray-800 duration-200 hover:bg-blue-400 hover:text-white`
                    }
                  >
                    <MdEmail fontSize="1.5rem" />
                    <span>Email Log</span>
                  </NavLink>
                </li>
              </>
            )}

            <li>
              <NavLink
                to="/contact-list"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-blue-400 text-white" : ""
                  } flex items-center p-3 gap-3 rounded-md text-gray-800 duration-200 hover:bg-blue-400 hover:text-white`
                }
              >
                <PiUserListFill fontSize="1.5rem" />
                <span>Contact List</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/employee-list"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-blue-400 text-white" : ""
                  } flex items-center p-3 gap-3 rounded-md text-gray-800 duration-200 hover:bg-blue-400 hover:text-white`
                }
              >
                <HiClipboardDocumentList fontSize="1.5rem" />
                <span>Employee List</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/send-email"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-blue-400 text-white" : ""
                  } flex items-center p-3 gap-3 rounded-md text-gray-800 duration-200 hover:bg-blue-400 hover:text-white`
                }
              >
                <IoMdSend fontSize="1.5rem" />
                <span>Send Email</span>
              </NavLink>
            </li>
          </ul>

          {/* develope by */}
          <h3 className="flex items-center gap-1 text-sm font-semibold text-gray-900">
            Developed by{" "}
            <Link to="https://itscholarbd.com/" target="_blank">
              <img
                className="w-[100px] mb-[11px]"
                src={IT_SCHOLAR_Logo}
                alt="IT SCHOLAR Logo"
              />
            </Link>
          </h3>
        </div>
      </nav>
    </aside>
  );
}
