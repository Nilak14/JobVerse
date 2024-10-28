"use client";
import Link from "next/link";
import { RainbowButton } from "./rainbow-button";
import { ArrowRightIcon, Building, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BorderBeam } from "./border-beam";
import { MagicCard } from "./magic-card";
import { useRouter } from "next/navigation";
const GetStartedButton = () => {
  const router = useRouter();
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <RainbowButton className="dark:text-black text-white p-5 flex gap-2 ">
            Start For Free <ArrowRightIcon />
          </RainbowButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register As</DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0  pt-5">
              <div onClick={() => router.push("/register?job-seeker")}>
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
              <div onClick={() => router.push("/register?company")}>
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
          <DialogFooter>
            <div className="text-center  text-sm">
              <span>Already have an account? </span>
              <Link className="text-primary relative group" href={"/login"}>
                Sign In
                <div className="bg-primary w-0 h-[1.5px] group-hover:w-full transition-all duration-300 ease-in-out block absolute right-0"></div>
              </Link>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default GetStartedButton;
