"use client";
import Link from "next/link";
import { Building, Loader2, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { MagicCard } from "./ui/magic-card";
import { BorderBeam } from "./ui/border-beam";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DialogDescription } from "@radix-ui/react-dialog";
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
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register As</DialogTitle>
          <DialogDescription className="sr-only">
            Please Select the type of account you want to create
          </DialogDescription>
          <div
            className={cn(
              "flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0  pt-5",
              loading && "pointer-events-none"
            )}
          >
            <div
              className="relative"
              onClick={() => {
                setLoading(true);
                console.log(loading);

                router.push("/register?type=job-seeker");
              }}
            >
              {loading && (
                <div className="bg-black/50 flex items-center justify-center rounded-md absolute inset-0 z-20">
                  <Loader2 size={30} className="animate-spin" />
                </div>
              )}
              <MagicCard
                gradientColor="gray"
                className=" cursor-pointer w-52 sm:w-56 h-28 sm:h-40 bg-background rounded-md border-input border-2 text-white flex justify-center flex-col gap-3 px-4"
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
                  <span className="text-xs mt-2 break-all whitespace-nowrap text-slate-100">
                    Search Job / Follow Company
                  </span>
                </div>
              </MagicCard>
            </div>
            <div
              className="relative"
              onClick={() => {
                setLoading(true);
                router.push("/register?type=company");
              }}
            >
              {loading && (
                <div className="bg-black/50 flex items-center justify-center rounded-md absolute inset-0 z-20">
                  <Loader2 size={30} className="animate-spin" />
                </div>
              )}
              <MagicCard
                gradientColor="gray"
                className=" cursor-pointer w-52 sm:w-56 h-28 sm:h-40 bg-background rounded-md border-input border-2 text-white flex justify-center flex-col gap-3 px-4"
              >
                <div className="flex gap-2 ">
                  <Building className=" size-6 sm:size-9 " />
                  <span className="text-lg font-semibold block sm:hidden">
                    Company
                  </span>
                </div>
                <div>
                  <span className="text-lg hidden sm:block font-semibold mt-2">
                    Company
                  </span>
                  <span className="text-xs mt-2 text-slate-100">
                    Post Job / Hire Talents
                  </span>
                </div>
              </MagicCard>
            </div>
          </div>
        </DialogHeader>
        <BorderBeam />
        {showFooter && (
          <DialogFooter>
            <div className="text-center  text-sm">
              <span>Already have an account? </span>
              <Link className="text-primary relative group" href={"/login"}>
                Sign In
                <div className="bg-primary w-0 h-[1.5px] group-hover:w-full transition-all duration-300 ease-in-out block absolute right-0"></div>
              </Link>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default RegisterModel;
