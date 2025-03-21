"use client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";

interface UnauthorizedApplyButtonProps {
  className?: string;
}

const UnauthorizedApplyButton = ({
  className,
}: UnauthorizedApplyButtonProps) => {
  return (
    <Button
      className={className}
      onClick={() => {
        toast.error("You need to login to apply for this job", {
          position: "top-right",
          action: (
            <>
              <button className="px-4  py-2 bg-white text-black rounded-md font-bold">
                <Link href={"/login"}>Login</Link>
              </button>
            </>
          ),
        });
      }}
    >
      Apply Now
    </Button>
  );
};
export default UnauthorizedApplyButton;
