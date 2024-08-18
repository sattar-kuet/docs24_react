import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { base64toBlob } from "../helpers/base64toBlob";
import { getBase64 } from "../helpers/getBase64";
import CustomButton from "./common/LoadingButton";

export default function CvUpload({ setValue, errors }) {
  const [image, setImage] = useState("");

  // file change and convert to base64
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        setImage(base64toBlob(result));

        // set input value
        setValue("cv", result?.split(",")[1], {
          shouldValidate: true,
        });
      })
      .catch((err) => {
        cogoToast.error(err);
      });
  };

  useEffect(() => {
    return () => URL.revokeObjectURL(image);
  }, [image]);

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <CustomButton
          color="pink"
          type="button"
          text={
            <span className="flex items-center gap-2">
              <MdCloudUpload fontSize="1.2rem" /> Upload CV
            </span>
          }
          className="h-11 "
          onClick={() => document.getElementById("file").click()}
        />
      </div>

      {image ? (
        <iframe
          src={image && URL.createObjectURL(image)}
          height="150px"
          className="object-contain mt-4 w-[400px] outline-none border-none"
        ></iframe>
      ) : null}

      <input
        type="file"
        id="file"
        hidden
        onChange={handleFileInputChange}
        accept="application/pdf"
      />

      {errors?.cv && (
        <span className="text-sm text-red-500 font-medium mt-1 block">
          {errors?.cv?.message}
        </span>
      )}
    </div>
  );
}
