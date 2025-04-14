import BoxReveal from "@/components/ui/box-reveal";

import { getAllApplicantsForCompany } from "@/data-access/application/getAllApplicantsForCompany";
import { Suspense } from "react";

import { DashboardSkeleton } from "@/components/skeletons/ApplicantPageSkeleton";
import ApplicantContent from "./ApplicantContent";

export const metadata = {
  title: "Applicants",
  description: "Manage and review job applicants for your posted positions",
};
const ApplicantPage = () => {
  return (
    <main>
      <section className="space-y-10">
        <BoxReveal>
          <div className="space-y-3">
            <h1 className=" text-xl md:text-2xl font-semibold tracking-tighter">
              Applicants
            </h1>
            <p className="text-sm text-muted-foreground  tracking-wide">
              Manage and review job applicants for your posted positions
            </p>
          </div>
        </BoxReveal>
        <Suspense fallback={<DashboardSkeleton />}>
          <ApplicationDataComponent />
        </Suspense>
      </section>
    </main>
  );
};
export default ApplicantPage;

const ApplicationDataComponent = async () => {
  const applicationData = await getAllApplicantsForCompany();

  return <ApplicantContent applicantData={applicationData!} />;
};
