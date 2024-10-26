import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
interface GoogleButtonProps {
  className?: string;
}
const GoogleButton = ({ className }: GoogleButtonProps) => {
  return (
    <Button variant={"secondary"} className={cn("flex gap-3 py-6", className)}>
      <FcGoogle />
      Continue With Google
    </Button>
  );
};
export default GoogleButton;
