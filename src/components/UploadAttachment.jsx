import { useState } from "react";
import { MdAttachEmail, MdClose } from "react-icons/md";
import { getBase64 } from "../helpers/getBase64";
import cogoToast from "cogo-toast";

const UploadAttachment = ({ setValue }) => {
  const [attachment, setAttachment] = useState(null);

  // file change and convert to base64
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    setAttachment(file);

    // convert file to base64
    getBase64(file)
      .then((result) => {
        file["base64"] = result;

        // set input value
        setValue("attachement", result?.split(",")[1], {
          shouldValidate: true,
        });
      })
      .catch((err) => {
        cogoToast.error(err);
      });
  };

  return (
    <div className="relative">
      <label
        className="bg-gray-100 border border-gray-300 p-2 text-gray-500 mt-2 cursor-pointer hover:bg-gray-300 flex items-center gap-1 "
        htmlFor="upload-attachment"
      >
        <MdAttachEmail />
        {attachment ? attachment.name : "Upload Attachment"}
        {/* Upload Attachment */}
        <input
          className="invisible w-0"
          id="upload-attachment"
          type="file"
          onChange={handleFileInputChange}
        />
      </label>

      {/* close button */}
      {attachment && (
        <button
          type="button"
          onClick={() => {
            setAttachment("");
            setValue("attachement", "");
          }}
          className="absolute right-0 top-0 z-40 h-full bg-gray-700 px-3 text-white"
        >
          <MdClose />{" "}
        </button>
      )}
    </div>
  );
};

export default UploadAttachment;
