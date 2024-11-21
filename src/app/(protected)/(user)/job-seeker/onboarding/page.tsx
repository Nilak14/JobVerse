import { signOut } from "@/auth";

const JobSeekerOnBoardingPage = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <h1>Job Seeker</h1>
      <button type="submit">Log Out</button>
    </form>
  );
};
export default JobSeekerOnBoardingPage;
