"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-dailog";
import LoadingButton from "../ui/loading-button";
import { deleteMockInterview } from "@/actions/mock-interview/delete-interview";
import { toast } from "sonner";
interface DeleteInterviewModalProps {
  interviewId: string;
}
const DeleteInterviewModal = ({ interviewId }: DeleteInterviewModalProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteMockInterview({ interviewId });
      if (res.success) {
        toast.success("Interview deleted successfully", {
          id: "delete-interview",
        });
        setOpenDeleteModal(false);
      } else {
        toast.error(res.message, { id: "delete-interview" });
      }
    } catch (error) {
      toast.error("Error deleting interview", { id: "delete-interview" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setOpenDeleteModal(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ResponsiveModal open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <ResponsiveModalContent isloading={loading ? "true" : undefined}>
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>Delete Mock Interview?</ResponsiveModalTitle>
            <ResponsiveModalDescription className="sr-only">
              Are you sure you want to delete this interview?
            </ResponsiveModalDescription>
            <div>
              <h3 className=" text-sm text-pretty mt-3">
                Are you sure you want to delete this interview? This action is
                irreversible.
              </h3>
            </div>
            <ResponsiveModalFooter>
              <div className="flex justify-between w-full mt-5">
                <Button
                  disabled={loading}
                  onClick={() => setOpenDeleteModal(false)}
                  variant={"secondary"}
                >
                  Cancel
                </Button>
                <LoadingButton
                  variant={"destructive"}
                  onClick={onDelete}
                  showIconOnly
                  loading={loading}
                >
                  Delete
                </LoadingButton>
              </div>
            </ResponsiveModalFooter>
          </ResponsiveModalHeader>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
};
export default DeleteInterviewModal;
