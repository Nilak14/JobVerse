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
      <h1>Company</h1>
      <button type="submit">Log Out</button>
      <h2 className="text-2xl">{session?.user.name}</h2>
      <h2 className="text-2xl">{session?.user.type}</h2>
    </form>
  );
};
export default CompanyHomePage;
