import { Dialog } from "@material-tailwind/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import EmployeeEditForm from "../../components/EmployeeEditForm";
import CustomButton from "../../components/common/LoadingButton";

export default function EmployeeAction({ row }) {
  // states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  return (
    <div className="flex gap-2 items-center justify-center py-2">
      <CustomButton
        color="blue"
        type="submit"
        text={
          <span className="flex items-center gap-2">
            Edit <MdEdit fontSize="1rem" />
          </span>
        }
        className="h-9"
        onClick={handleOpen}
      />
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-white shadow-none rounded-none"
      >
        <EmployeeEditForm row={row} setOpen={setOpen} />
      </Dialog>
    </div>
  );
}
