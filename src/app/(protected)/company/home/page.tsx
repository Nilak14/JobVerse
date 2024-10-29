import { auth, signOut } from "@/auth";

const CompanyHomePage = async () => {
  const session = await auth();

  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Log Out</button>
      <p>{JSON.stringify(session?.user)}</p>
    </form>
  );
};
export default CompanyHomePage;
