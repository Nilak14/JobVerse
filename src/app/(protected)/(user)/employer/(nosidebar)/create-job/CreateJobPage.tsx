"use client";
import JobBasicsForm from "@/components/Forms/CreateJobForms/JobBasicsForm";
import JobDetailsForm from "@/components/Forms/CreateJobForms/JobDetailsForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CreateJobPage = () => {
  return (
    <section className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Create Your Job</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to create a new job post. Your progress will be
          saved automatically
        </p>
      </header>
      <main className="relative grow ">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="w-full md:w-1/2 p-3 overflow-y-auto">
            {/* <JobBasicsForm /> */}
            <JobDetailsForm />
          </div>
          <div className="grow md:border-r" />
          <div className="hidden w-1/2 md:flex">right</div>
        </div>
      </main>
      <footer className="w-full border-t px-3 py-5">
        <div className=" mx-auto flex flex-wrap justify-between gap-3 px-4 md:px-12 lg:px-24">
          <div className="flex items-center gap-3">
            <Button variant={"secondary"}>Previous Step</Button>
            <Button>Next Step</Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant={"secondary"} asChild>
              <Link href={"/employer/job"}>Close</Link>
            </Button>
            <p className="text-muted-foreground opacity-0">Saving...</p>
          </div>
        </div>
      </footer>
    </section>
  );
};
export default CreateJobPage;
