import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { UserType } from "@prisma/client";
import { signIn } from "next-auth/react";
import { setCookie } from "cookies-next";
interface GoogleButtonProps {
  className?: string;
  userType?: UserType;
  isDisabled: boolean;
}
const GoogleButton = ({
  className,
  userType,
  isDisabled,
}: GoogleButtonProps) => {
  return (
    <>
      <Button
        disabled={isDisabled}
        onClick={async () => {
          if (userType) {
            setCookie("type", userType);
          }
          await signIn("google");
        }}
        type="submit"
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
