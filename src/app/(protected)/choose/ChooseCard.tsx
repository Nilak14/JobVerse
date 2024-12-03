"use client";

import { MagicCard } from "@/components/ui/magic-card";
import { cn } from "@/lib/utils";
import { UserType } from "@prisma/client";
import { Building, Loader2, User } from "lucide-react";
import { useState } from "react";
export const dynamic = "force-dynamic";
interface ChooseCardProps {
  updateUserType: (type: UserType) => Promise<void>;
}

const ChooseCard = ({ updateUserType }: ChooseCardProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div
        className={cn(
          "flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 pt-5",
          loading && "pointer-events-none"
        )}
      >
        <div
          className="relative overflow-hidden "
          onClick={async () => {
            setLoading(true);
            await updateUserType("JOB_SEEKER");
            setLoading(false);
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
          className="relative z-10"
          onClick={async () => {
            setLoading(true);
            await updateUserType("COMPANY");
            setLoading(false);
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
    </>
  );
};
export default ChooseCard;
