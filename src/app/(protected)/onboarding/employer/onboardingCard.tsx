"use client";
import CreateCompanyModal from "@/components/CreateCompanyModal";
import CardWrapper from "@/components/Global/CardWrapper";
import InvitationsModal from "@/components/InvitationsModal";
import { Button } from "@/components/ui/button";
import { ExtendedUser } from "@/next-auth";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInvitationModal } from "@/store/useInvitaionModal";
interface OnBoardingCardProps {
  user: ExtendedUser;
}
const OnBoardingCard = ({ user }: OnBoardingCardProps) => {
  const [openCreateCompanyModal, setOpenCreateCompanyModal] = useState(false);
  const { openInvitationModal, setOpenInvitationModal } = useInvitationModal();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CardWrapper classname="mt-20 w-full">
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-bold text-xl text-pretty">
              Looks Like You do not have a company in your{" "}
              <br className="hidden sm:block" /> account{" "}
            </h2>
            <Button
              onClick={() => setOpenCreateCompanyModal(true)}
              className="w-full"
            >
              Create a Company
            </Button>
          </div>
          <div className="w-full flex items-center justify-center mt-5">
            <Button
              onClick={() => setOpenInvitationModal(true)}
              variant={"link"}
            >
              View Invitations (Join Company)
            </Button>
          </div>
        </CardWrapper>
      </motion.div>
      {openInvitationModal && <InvitationsModal user={user} />}
      {openCreateCompanyModal && (
        <CreateCompanyModal
          user={user}
          open={openCreateCompanyModal}
          setOpen={setOpenCreateCompanyModal}
        />
      )}
    </>
  );
};
export default OnBoardingCard;
