import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import cogoToast from "cogo-toast";
import { useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaChalkboardUser } from "react-icons/fa6";
import { MdOutlineLogout, MdVerifiedUser } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "../../app/features/auth/authApi";
import { useGetExtendedProfileQuery } from "../../app/features/profile/profileApi";
import userIcon from "../../assets/user_icon.png";

export default function ProfileMenu() {
  // redux element
  const { userInfo, userCheckInfo } = useSelector((state) => state.auth);
  const { isLoading, data } = useGetExtendedProfileQuery(
    `company/${userInfo?.uid}`
  );
  const [
    userLogout,
    { isLoading: logoutLoading, isError, error, data: logoutData },
  ] = useUserLogoutMutation();

  // navigate
  const navigate = useNavigate();

  // logout
  const handleLogout = async () => {
    await userLogout();
  };

  // logout status
  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.error);
    }
    if (logoutData?.result?.status) {
      cogoToast.success(logoutData?.result?.message);
    }
  }, [isError, error, logoutData, logoutLoading]);

  return isLoading ? (
    <div className="rounded-full bg-blue-gray-100 h-10 w-10 animate-pulse"></div>
  ) : (
    <Menu className="bg-blue-gray-500">
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="user icon"
          className="cursor-pointer w-10 h-10"
          src={
            data?.result?.data?.logo
              ? `data:image/*;base64,${data?.result?.data?.logo}`
              : userIcon
          }
        />
      </MenuHandler>
      <MenuList className="w-[230px]">
        <MenuItem className="cursor-default">
          <div className="font-semibold text-[16px]">
            {userInfo?.name}
            {/* <Chip
              value={userInfo?.uid}
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full w-max"
            /> */}
          </div>
          <p className="font-medium text-xs">{userInfo?.email}</p>
        </MenuItem>

        <hr className="my-2 border-blue-gray-50" />

        <MenuItem
          className="flex items-center gap-2"
          onClick={() => navigate("/profile")}
        >
          <MdVerifiedUser fontSize="1.1rem" />
          <Typography variant="small" className="font-medium">
            My Profile
          </Typography>
        </MenuItem>

        {userCheckInfo?.is_business_account ? (
          <MenuItem
            className="flex items-center gap-2"
            onClick={() => navigate("/business-profile")}
          >
            <FaChalkboardUser fontSize="1.1rem" />
            <Typography variant="small" className="font-medium">
              Business Profile
            </Typography>
          </MenuItem>
        ) : (
          <MenuItem
            className="flex items-center gap-2"
            onClick={() => navigate("/extended-profile")}
          >
            <RiShieldUserFill fontSize="1.1rem" />
            <Typography variant="small" className="font-medium">
              Extended Profile
            </Typography>
          </MenuItem>
        )}

        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2" onClick={handleLogout}>
          {logoutLoading ? (
            <CgSpinner fontSize="1.1rem" className="animate-spin" />
          ) : (
            <MdOutlineLogout fontSize="1.1rem" />
          )}

          <Typography variant="small" className="font-medium">
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
