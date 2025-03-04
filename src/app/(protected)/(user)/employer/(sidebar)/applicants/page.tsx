import BoxReveal from "@/components/ui/box-reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllApplicantsForCompany } from "@/data-access/application/getAllApplicantsForCompany";
import { Suspense } from "react";
import ApplicantGridView from "./ApplicantGridView";
import ApplicantListView from "./ApplicantListView";
import { DashboardSkeleton } from "@/components/skeletons/ApplicantPageSkeleton";

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

export const ApplicationDataComponent = async () => {
  const applicationData = await getAllApplicantsForCompany();
  return (
    <Tabs defaultValue="grid" className="mt-6">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="grid" className="mt-6">
        <ApplicantGridView applicantData={applicationData!} />
      </TabsContent>
      <TabsContent value="list" className="mt-6">
        <ApplicantListView applicantData={applicationData!} />
      </TabsContent>
    </Tabs>
  );
};
