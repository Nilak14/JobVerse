import { auth } from "@/auth";
import {
  DEFAULT_LOGIN_REDIRECT_ADMIN,
  DEFAULT_LOGIN_REDIRECT_COMPANY,
  DEFAULT_LOGIN_REDIRECT_JOB_SEEKER,
} from "@/routes";
import { redirect } from "next/navigation";

const RedirectPage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    console.log("no user");

    redirect("/login");
  }
  switch (user.type) {
    case "JOB_SEEKER":
      redirect(DEFAULT_LOGIN_REDIRECT_JOB_SEEKER);
    case "COMPANY":
      redirect(DEFAULT_LOGIN_REDIRECT_COMPANY);
    case "ADMIN":
      redirect(DEFAULT_LOGIN_REDIRECT_ADMIN);
    default:
      throw new Error("Invalid user type");
  }
};
export default RedirectPage;
