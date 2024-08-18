import { Dialog, IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { MdOutlineClose, MdRemoveRedEye } from "react-icons/md";
import JobDetails from "../../components/JobDetails";
import CustomButton from "../../components/common/LoadingButton";

export function JobAction({ row }) {
  // states
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  return (
    <div className="flex gap-2 items-center justify-center py-2">
      <div>
        <CustomButton
          color="blue"
          type="button"
          text={
            <span className="flex items-center gap-1">
              <MdRemoveRedEye fontSize="1.1rem" /> View
            </span>
          }
          className="h-9 text-xs"
          onClick={handleOpen}
        />
        <Dialog
          size="lg"
          open={open}
          handler={handleOpen}
          className="bg-white shadow-none rounded-none p-5 overflow-y-scroll max-h-full"
        >
          <div className="absolute right-2 top-2">
            <IconButton
              className="rounded-full"
              variant="text"
              onClick={() => setOpen(false)}
              type="button"
            >
              <MdOutlineClose fontSize="1.2rem" />
            </IconButton>
          </div>
          <JobDetails row={row} />
        </Dialog>
      </div>
    </div>
  );
}
