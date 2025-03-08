import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface JobSeekerProfileSheetProps {
  open: boolean;
  onClose: () => void;
  jobSeekerId: string;
}
const JobSeekerProfileSheet = ({
  jobSeekerId,
  onClose,
  open,
}: JobSeekerProfileSheetProps) => {
  console.log("hello from", jobSeekerId);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{jobSeekerId}</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default JobSeekerProfileSheet;
