import { Metadata } from "next";
import BrowsePage from "./BrowsePage";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Browse Jobs",
  description:
    "Explore a wide range of job opportunities tailored to your skills and preferences. Find your next career move with ease.",
};

const JobBrowsePage = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  return <BrowsePage user={session.user} />;
};
export default JobBrowsePage;
