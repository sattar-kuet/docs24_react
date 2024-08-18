import { Avatar, IconButton } from "@material-tailwind/react";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { IoCamera } from "react-icons/io5";
import userIcon from "../assets/user_icon.png";
import { getBase64 } from "../helpers/getBase64";

export default function AvatarUpload({ defaultData, setValue, errors }) {
  const [image, setImage] = useState(
    defaultData ? `data:image/*;base64,${defaultData}` : userIcon
  );

  // file change and convert to base64
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        setImage(result);
        setValue("logo", result?.split(",")[1], {
          shouldValidate: true,
        });
      })
      .catch((err) => {
        cogoToast.error(err);
      });
  };

  return (
    <div className="relative">
      <Avatar
        src={image}
        alt="avatar"
        size="xxl"
        className={`border-2 ${
          errors?.logo ? "border-red-300" : "border-gray-50"
        }`}
      />
      <input
        type="file"
        id="file"
        hidden
        onChange={handleFileInputChange}
        accept="image/*"
      />
      <div className="absolute right-0 bottom-0">
        <IconButton
          className="rounded-full bg-white opacity-100 shadow-none text-gray-800"
          // variant="text"
          onClick={() => document.getElementById("file").click()}
        >
          <IoCamera fontSize="1.4rem" />
        </IconButton>
      </div>

      {/* {errors?.logo && (
        <span className="text-sm text-red-500 font-medium mt-1 block">
          {errors?.logo?.message}
        </span>
      )} */}
    </div>
  );
}
