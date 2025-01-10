import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { Input } from "./ui/input";
import { Search, UserX } from "lucide-react";

import UserAvatar from "./Global/Useravatar";
import LoadingButton from "./ui/loading-button";

import { motion } from "framer-motion";
import { AnimatedList } from "./ui/animated-list";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import { useEffect, useState } from "react";
import EmployerSearchSkeleton from "./skeletons/EmployerSearchSkeleton";
import { ExtendedUser } from "@/next-auth";

interface RemoveCompanyMemberModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeCompany: CompanyInclude;
  user: ExtendedUser;
}

const RemoveCompanyMemberModal = ({
  open,
  setOpen,
  activeCompany,
  user,
}: RemoveCompanyMemberModalProps) => {
  const [employer, setEmployer] = useState<CompanyInclude["employers"]>(
    activeCompany.employers
  );
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    if (searchQuery) {
      const filteredEmployers = activeCompany.employers.filter((employer) => {
        return (
          employer.user.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          employer.user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setEmployer(filteredEmployers);
      setLoading(false);
    } else {
      setEmployer(activeCompany.employers);
      setLoading(false);
    }
  }, [searchQuery]);

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent>
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
          {employer.length >= 1 ? (
            employer.map((employee) => {
              return (
                <AnimatedList key={employee.id} delay={0.5}>
                  <div
                    className="border-input border w-full p-4 rounded-lg flex items-center justify-between"
                    key={employee.id}
                  >
                    <div className="flex items-center gap-5 w-full truncate ">
                      <UserAvatar
                        imageUrl={employee.user.image || ""}
                        userName={employee.user.name!}
                      />
                      <div className="max-w-[250px] ">
                        <p className="truncate">{employee.user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {employee.user.email}
                        </p>
                      </div>
                    </div>
                    <LoadingButton
                      //   onClick={() => handleInvite(employerId)}
                      showIconOnly
                      className="group"
                      variant={"secondary"}
                      loading={false}
                      //   loading={loadingStates[employerId] || false}
                    >
                      <UserX />
                      <span className="hidden md:block">Remove</span>
                    </LoadingButton>
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
          {searchQuery && employer.length === 0 && (
            <motion.p
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="text-muted-foreground text-sm text-center"
            >
              No results found for "{searchQuery + "ddd"}"
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
