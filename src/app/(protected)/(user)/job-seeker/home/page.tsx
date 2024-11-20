import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

const JobSeekerHomePage = async () => {
  const session = await auth();
  if (!session?.user.isOnBoarded) {
    redirect("/job-seeker/onboarding");
  }

  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <h1>Job Seeker</h1>
      <button type="submit">Log Out</button>
      <h2 className="text-2xl">{session?.user.name}</h2>
      <h2 className="text-2xl">{session?.user.type}</h2>
      <h1 className="text-2xl">{JSON.stringify(session?.user.isOnBoarded)} </h1>
    </form>
  );
};
export default JobSeekerHomePage;
