import AccountSettingContent from "@/components/JobSeeker/Settings/AccountSettingContent";
import BoxReveal from "@/components/ui/box-reveal";
import { auth } from "@/lib/auth";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  const session = await auth();
  if (!session || !session.user) {
    return {};
  }
  return {
    title: session.user.name,
    description: "Account settings page for " + session.user.name,
  };
};

const JobSeekerAccountSettingsPage = async () => {
  // const jobSeeker  =
  return (
    <section className="space-y-10">
      <BoxReveal>
        <div className="space-y-3">
          <h1 className=" text-xl md:text-2xl font-semibold tracking-tighter">
            Account Settings
          </h1>
          <p className="text-sm text-muted-foreground  tracking-wide">
            Manage your JobVerse Account and preferences
          </p>
        </div>
      </BoxReveal>
      <AccountSettingContent />
    </section>
  );
};
export default JobSeekerAccountSettingsPage;
