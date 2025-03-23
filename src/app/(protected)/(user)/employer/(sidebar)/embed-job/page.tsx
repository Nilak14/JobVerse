import WidgetConfigurator from "@/components/Job/embed/EmbedPageContent";
import BoxReveal from "@/components/ui/box-reveal";
import { getAllCompanyActiveJobs } from "@/data-access/job/getAllCompanyJobs";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Embed Job",
  description: "Embed Job Page",
};

const EmbedJobPage = async () => {
  const session = await auth();
  if (!session || !session.activeCompanyId) {
    return null;
  }
  return (
    <main>
      <section className="space-y-10">
        <BoxReveal>
          <div className="space-y-3">
            <h1 className=" text-xl md:text-2xl font-semibold tracking-tighter">
              JobVerse Widget Configurator
            </h1>
            <p className="text-sm text-muted-foreground  tracking-wide">
              Create an embeddable job widget for your company website that
              stays in sync with your JobVerse listings.
            </p>
          </div>
        </BoxReveal>
        <Suspense fallback={<div>Loading...</div>}>
          <EmbedJobPageData companyId={session.activeCompanyId} />
        </Suspense>
      </section>
    </main>
  );
};
export default EmbedJobPage;

const EmbedJobPageData = async ({ companyId }: { companyId: string }) => {
  const jobs = await getAllCompanyActiveJobs(companyId);
  return <WidgetConfigurator jobs={jobs} />;
};
