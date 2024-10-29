import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
interface GoogleButtonProps {
  className?: string;
}
const GoogleButton = ({ className }: GoogleButtonProps) => {
  return (
    <>
      {/* <form
        action={async () => {
          "use server";
          await signIn("google", {
            callbackUrl: "/company/home",
            userType: "COMPANY",
          });
        }}
      > */}
      <Button
        type="submit"
        onClick={() => {
          signIn("google", {
            callbackUrl: "/company/home",
            userType: "COMPANY",
          });
        }}
        variant={"secondary"}
        className={cn("flex gap-3 py-6", className)}
      >
        <FcGoogle />
        Continue With Google
      </Button>
      {/* </form> */}
    </>
  );
};
export default GoogleButton;
