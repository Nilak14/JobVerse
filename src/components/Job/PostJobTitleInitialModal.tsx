import { Input } from "../ui/input";
import { Label } from "../ui/label";
import LoadingButton from "../ui/loading-button";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-dailog";
import Form from "next/form";

interface PostJobTitleInitialModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostJobTitleInitialModal = ({
  open,
  setOpen,
}: PostJobTitleInitialModalProps) => {
  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Create a new job</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Enter a job title To get started
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Form action={"/api/job"}>
          <Label>Job Title</Label>
          <Input type="text" />
        </Form>
        <ResponsiveModalFooter>
          <LoadingButton className="w-full" loading>
            Create Job
          </LoadingButton>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
export default PostJobTitleInitialModal;
