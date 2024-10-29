"use client";

import { MagicCard } from "@/components/ui/magic-card";
import { UserType } from "@prisma/client";
import { Building, User } from "lucide-react";
interface ChooseCardProps {
  updateUserType: (type: UserType) => Promise<void>;
}
const ChooseCard = ({ updateUserType }: ChooseCardProps) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0  pt-5">
        <div
          onClick={async () => {
            await updateUserType("JOB_SEEKER");
          }}
        >
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
          onClick={async () => {
            await updateUserType("COMPANY");
          }}
        >
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
