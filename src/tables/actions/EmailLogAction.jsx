import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsFillQuestionOctagonFill } from "react-icons/bs";
import CustomButton from "../../components/common/LoadingButton";
import { useDeleteEmailLogMutation } from "../../app/features/email/emailApi";
import cogoToast from "cogo-toast";

export function EmailLogAction({ row }) {
  // ? -> LOCAL STATES
  // dialog open or close state
  const [dialogOpen, setDialogOpen] = useState(false);

  // ? -> RTK HOOKS
  // @delete email log
  const [deleteEmailLog, { isLoading: deleteLoading }] =
    useDeleteEmailLogMutation();

  // ? -> FUNCTIONS
  // handle open or close dialog
  const handleOpenOrCloseDialog = () => {
    setDialogOpen((cur) => !cur);
  };

  // handle delete email log
  const handleDeleteEmailLog = async () => {
    try {
      // delete email log
      const { data } = await deleteEmailLog({
        params: {
          id: row.original?.id,
        },
      });

      // show success message
      if (data?.result.status) {
        cogoToast.success(
          data?.result?.message || "Email log deleted successfully"
        );
      }

      // close dialog
      handleOpenOrCloseDialog();
    } catch (error) {
      cogoToast.error(error?.error || "Failed to delete email log");
      console.error("error :>> ", error);
    }
  };

  return (
    <div className="flex gap-2 items-center justify-center py-2">
      <div>
        {/* CELL DELETE BUTTON */}
        <CustomButton
          color="red"
          type="button"
          text={
            <span className="flex items-center gap-1">
              <MdDeleteOutline fontSize="1.1rem" /> Delete
            </span>
          }
          className="h-9 text-xs"
          onClick={handleOpenOrCloseDialog}
        />

        {/* DELETE ALERT */}
        <Dialog
          size="sm"
          open={dialogOpen}
          handler={handleOpenOrCloseDialog}
          className="bg-white shadow-none rounded-none p-5 max-h-full z-10"
        >
          <DialogHeader className="text-7xl text-yellow-800 justify-center">
            <BsFillQuestionOctagonFill />
          </DialogHeader>

          <DialogBody className="text-center">
            Are you sure you want to delete?
          </DialogBody>

          {/* delete action */}
          <DialogFooter className="gap-2 justify-center">
            <CustomButton
              color="blue"
              type="button"
              variant="outlined"
              text="Cancel"
              className="h-9 text-xs"
              onClick={handleOpenOrCloseDialog}
            />
            <CustomButton
              color="red"
              type="button"
              text={
                <span className="flex items-center gap-1">
                  Delete <MdDeleteOutline fontSize="1.1rem" />
                </span>
              }
              isLoading={deleteLoading}
              className="h-9 text-xs"
              onClick={handleDeleteEmailLog}
            />
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}
