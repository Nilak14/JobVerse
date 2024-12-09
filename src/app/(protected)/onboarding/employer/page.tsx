import { auth } from "@/auth";
import { redirect } from "next/navigation";

const EmployerOnboardingPage = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.type !== "EMPLOYER") {
    redirect("/login");
  }

  return (
    <div>
      Name: {user.name}
      Email: {user.email}
      Type: {user.type}
    </div>
  );
};
export default EmployerOnboardingPage;
