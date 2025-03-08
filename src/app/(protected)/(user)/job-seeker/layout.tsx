import JobSeekerPremiumModal from "@/components/premium/JobSeekerPremiumModal";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const JobSeekerLayout = async ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const session = await auth();
  if (!session || session.user.type !== "JOB_SEEKER") {
    redirect("/");
  }

  return (
    <>
      {children}
      <JobSeekerPremiumModal />
    </>
  );
};
export default JobSeekerLayout;
