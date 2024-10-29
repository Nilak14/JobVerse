import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { UserType } from "@prisma/client";
interface GoogleButtonProps {
  className?: string;
  userType?: UserType;
}
const GoogleButton = ({ className, userType }: GoogleButtonProps) => {
  return (
    <>
      <Button
        type="submit"
        onClick={() => {
          userType
            ? signIn("google", {
                redirectTo: `/setup?type=${userType}`,
              })
            : signIn("google");
        }}
        variant={"secondary"}
        className={cn("flex gap-3 py-6", className)}
      >
        <FcGoogle />
        Continue With Google
      </Button>
    </>
  );
};
export default GoogleButton;
