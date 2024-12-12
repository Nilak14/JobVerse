"use client";

import { useEffect, useState } from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import UserAvatar from "../Global/Useravatar";
import { EmployerCompanies } from "@/lib/prismaTypes";
import { ExtendedUser } from "@/next-auth";
import CreateCompanyModal from "../CreateCompanyModal";
import { useAction } from "next-safe-action/hooks";
import { switchCompany } from "@/actions/SwitchCompany";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CompanySwitcher({
  companies,
  activeCompanyId,
  user,
}: {
  companies: EmployerCompanies["companies"];
  user: ExtendedUser;
  activeCompanyId?: string | null;
}) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = useState(companies[0]);
  const [openCreateCompanyModal, setOpenCreateCompanyModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (activeCompanyId) {
      const activeCompany = companies.find(
        (company) => company.id === activeCompanyId
      );
      if (activeCompany) {
        setActiveTeam(activeCompany);
      } else {
        setActiveTeam(companies[0]);
      }
    }
  }, [activeCompanyId]);

  const { execute, status } = useAction(switchCompany, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success("Company switched successfully", {
          id: "switch-company",
        });
        router.refresh();
      } else if (data?.error) {
        toast.error(data.error, { id: "switch-company" });
      }
    },
    onError: () => {
      toast.error("Error switching company", { id: "switch-company" });
    },
  });
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground gap-2"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <UserAvatar
                    imageUrl={activeTeam.logoUrl!}
                    userName={activeTeam.name}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    JobVerse
                    <span className=" text-amber-400 text-xs absolute ml-1 top-[5.1px] z-[99999] ">{`${"Pro"}`}</span>
                  </span>
                  <span className="truncate text-xs relative">
                    {activeTeam.name}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Switch Company
              </DropdownMenuLabel>
              {companies.map((company, index) => (
                <DropdownMenuItem
                  disabled={status === "executing"}
                  key={company.name}
                  onClick={() => {
                    setActiveTeam(company);
                    execute({ companyId: company.id });
                  }}
                  className="gap-5 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <UserAvatar
                      imageUrl={company.logoUrl!}
                      userName={company.name}
                    />
                  </div>
                  <span className="line-clamp-2">{company.name}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setOpenCreateCompanyModal(true)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Add Company
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      {openCreateCompanyModal && (
        <CreateCompanyModal
          user={user}
          open={openCreateCompanyModal}
          setOpen={setOpenCreateCompanyModal}
        />
      )}
    </>
  );
}
