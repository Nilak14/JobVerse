import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import UserAvatar from "@/components/Global/Useravatar";

import { motion } from "framer-motion";
import { AnimatedList } from "@/components/ui/animated-list";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import { useEffect, useState } from "react";
import EmployerSearchSkeleton from "@/components/skeletons/EmployerSearchSkeleton";
import { Session } from "next-auth";
import RemoveCompanyMemberPopover from "@/components/Company/RemoveCompanyMemberPopover";

interface RemoveCompanyMemberModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeCompany: CompanyInclude;
  session: Session;
}

const RemoveCompanyMemberModal = ({
  open,
  setOpen,
  activeCompany,
  session,
}: RemoveCompanyMemberModalProps) => {
  const [members, setMember] = useState<CompanyInclude["members"]>(
    activeCompany.members
  );
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    if (searchQuery) {
      const filteredMembers = activeCompany.members.filter((member) => {
        return (
          member.employer.user.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          member.employer.user.email
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      });
      setMember(filteredMembers);
      setLoading(false);
    } else {
      setMember(activeCompany.members);
      setLoading(false);
    }
  }, [searchQuery]);

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent
        onInteractOutside={(e) => {
          removeLoading && e.preventDefault();
        }}
      >
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            Remove Members From {activeCompany.name}
          </ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <ResponsiveModalDescription className="sr-only">
          Remove Members From {activeCompany.name}
        </ResponsiveModalDescription>
        <div className="flex items-center flex-col">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Employer To Remove"
            endIcon={Search}
            type="text"
          />
          <p className="text-xs text-muted-foreground mt-2 self-start">
            Search By Name or Email
          </p>
        </div>
        <section className="space-y-3 max-h-[246px] over-x-hidden overflow-y-auto">
          {members.length >= 1 ? (
            members.map((member) => {
              return (
                <AnimatedList key={member.employer.user.id} delay={0.5}>
                  <div
                    className="border-input border w-full p-4 rounded-lg flex items-center justify-between"
                    key={member.employer.user.id}
                  >
                    <div className="flex items-center gap-5 w-full truncate ">
                      <UserAvatar
                        imageUrl={member.employer.user.image || ""}
                        userName={member.employer.user.name!}
                      />
                      <div className="max-w-[250px] ">
                        <p className="truncate">{member.employer.user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {member.employer.user.email}
                        </p>
                      </div>
                    </div>
                    <RemoveCompanyMemberPopover
                      activeCompany={activeCompany}
                      setLoading={setRemoveLoading}
                      setDialogOpen={setOpen}
                      member={member}
                    />
                    {/* <LoadingButton
                      //   onClick={() => handleInvite(employerId)}
                      showIconOnly
                      className="group"
                      variant={"secondary"}
                      loading={false}
                      //   loading={loadingStates[employerId] || false}
                    >
                      <UserX />
                      <span className="hidden md:block">Remove</span>
                    </LoadingButton> */}
                  </div>
                </AnimatedList>
              );
            })
          ) : (
            <motion.p
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="text-muted-foreground text-sm text-center"
            >
              {!searchQuery && "No members to remove"}
            </motion.p>
          )}
          {searchQuery && members.length === 0 && (
            <motion.p
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="text-muted-foreground text-sm text-center"
            >
              No results found for "{searchQuery}"
            </motion.p>
          )}
          {loading && (
            <AnimatedList delay={0.5}>
              <EmployerSearchSkeleton />
              <EmployerSearchSkeleton />
            </AnimatedList>
          )}
        </section>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default RemoveCompanyMemberModal;
