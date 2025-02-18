import { Metadata } from "next";
import SaveJobPage from "./SaveJobPage";
import EmptySavedJobsState from "@/components/Job/NoSavedJobs";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Saved Jobs",
  description: " Saved Jobs Page ",
};
const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return <SaveJobPage session={session} />;
};
export default page;
