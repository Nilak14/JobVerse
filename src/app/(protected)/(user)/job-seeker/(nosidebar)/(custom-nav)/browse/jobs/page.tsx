import { Metadata } from "next";
import BrowsePage from "./BrowsePage";
import { auth } from "@/lib/auth";
import BrowsePageTop from "./BrowsePageTop";

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
  return (
    <div>
      <header className="sticky top-0 z-20  overflow-hidden">
        <BrowsePageTop user={session.user} />
      </header>
      <BrowsePage session={session} />;
    </div>
  );
};
export default JobBrowsePage;
