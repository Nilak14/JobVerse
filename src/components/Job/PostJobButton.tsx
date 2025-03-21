"use client";
import { BriefcaseMedical } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import useCompanyPremiumModal from "@/store/useCompanyPremiumModal";
interface PostJobButtonProps {
  canCreate: boolean;
}
const PostJobButton = ({ canCreate }: PostJobButtonProps) => {
  const { setOpenCompanyPremiumModal } = useCompanyPremiumModal();
  if (!canCreate) {
    return (
      <Button onClick={() => setOpenCompanyPremiumModal(true)}>
        <BriefcaseMedical />
        Post New Job
      </Button>
    );
  }
  return (
    <Button asChild>
      <Link href={"/employer/job-studio"}>
        <BriefcaseMedical />
        Post New Job
      </Link>
    </Button>
  );
};
export default PostJobButton;
