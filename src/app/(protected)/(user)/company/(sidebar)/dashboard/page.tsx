import { auth, signOut } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard For Company",
};
const CompanyDashboardPage = async () => {
  const session = await auth();
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <h1 className="">Company</h1>
      <button type="submit">Log Out</button>
      <h2 className="text-2xl">{session?.user.name}</h2>
      <h2 className="text-2xl">{session?.user.type}</h2>
    </form>
  );
};
export default CompanyDashboardPage;
