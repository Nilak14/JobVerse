"use client";
import Link from "next/link";
import { Building, User } from "lucide-react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { MagicCard } from "./ui/magic-card";
import { BorderBeam } from "./ui/border-beam";
import { cn } from "@/lib/utils";
import RegisterLinks from "./RegisterLinks";
import { useTheme } from "next-themes";
interface RegisterModelProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  showFooter?: boolean;
}

const RegisterModel = ({
  open,
  setOpen,
  showFooter = true,
}: RegisterModelProps) => {
  const { theme } = useTheme();
  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent className="overflow-hidden lg:m-0 m-[2px]">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Register As</ResponsiveModalTitle>
          <ResponsiveModalDescription className="sr-only">
            Please Select the type of account you want to create
          </ResponsiveModalDescription>
          <div
            className={cn(
              "flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0  pt-5"
            )}
          >
            <RegisterLinks href="/register/job_seeker" className="relative ">
              <MagicCard
                gradientColor={theme === "dark" ? "gray" : "#d9d9d9"}
                className=" cursor-pointer w-52 sm:w-56 h-28 sm:h-40 bg-background rounded-md border-input border-2 dark:text-white text-black flex justify-center flex-col gap-3 px-4"
              >
                <div className="flex gap-2 ">
                  <User className=" size-6 sm:size-9 " />
                  <span className="text-lg font-semibold block sm:hidden">
                    Job Seeker
                  </span>
                </div>
                <div>
                  <span className="text-lg font-semibold hidden sm:block mt-2">
                    Job Seeker
                  </span>
                  <span className="text-xs mt-2 break-all whitespace-nowrap text-muted-foreground dark:text-slate-100">
                    Search Job / Follow Company
                  </span>
                </div>
              </MagicCard>
            </RegisterLinks>
            <RegisterLinks href="/register/employer" className="relative">
              <MagicCard
                gradientColor={theme === "dark" ? "gray" : "#d9d9d9"}
                className=" cursor-pointer w-52 sm:w-56 h-28 sm:h-40 bg-background rounded-md border-input border-2 dark:text-white text-black flex justify-center flex-col gap-3 px-4"
              >
                <div className="flex gap-2 ">
                  <Building className=" size-6 sm:size-9 " />
                  <span className="text-lg font-semibold block sm:hidden">
                    Employer
                  </span>
                </div>
                <div>
                  <span className="text-lg hidden sm:block font-semibold mt-2">
                    Employer
                  </span>
                  <span className="text-xs mt-2 break-all whitespace-nowrap text-muted-foreground dark:text-slate-100">
                    Post Job / Hire Talents
                  </span>
                </div>
              </MagicCard>
            </RegisterLinks>
          </div>
        </ResponsiveModalHeader>
        <BorderBeam />
        {showFooter && (
          <ResponsiveModalFooter className="md:mt-0 mt-4">
            <div className="text-center  text-sm">
              <span>Already have an account? </span>
              <Link className="text-primary relative group" href={"/login"}>
                Sign In
                <div className="bg-primary w-0 h-[1.5px] group-hover:w-full transition-all duration-300 ease-in-out block absolute right-0"></div>
              </Link>
            </div>
          </ResponsiveModalFooter>
        )}
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
export default RegisterModel;
