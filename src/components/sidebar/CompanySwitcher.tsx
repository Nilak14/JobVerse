"use client";

import { useEffect, useState } from "react";
import { Check, CheckCircle, ChevronsUpDown, Plus } from "lucide-react";

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
import { EmployerCompany } from "@/lib/prisma-types/Employers";
import { ExtendedUser } from "@/next-auth";
import CreateCompanyModal from "@/components/Company/CreateCompanyModal";
import CompanySwitchDialog from "@/components/Company/CompanySwitchDialog";
import { useActiveCompany } from "@/store/useActiveCompany";
import { Badge } from "../ui/badge";

export function CompanySwitcher({
  companies,
  activeCompanyId,
  user,
}: {
  companies: EmployerCompany[];
  user: ExtendedUser;
  activeCompanyId?: string | null;
}) {
  const { isMobile } = useSidebar();
  const { setActiveCompany: setActiveCompanyStore } = useActiveCompany();
  const [activeCompany, setActiveCompany] = useState(companies[0]);
  const [selectedCompany, setSelectedCompany] = useState<EmployerCompany>();

  const [openCreateCompanyModal, setOpenCreateCompanyModal] = useState(false);
  const [openCompanySwitcherDialog, setOpenCompanySwitcherDialog] =
    useState(false);

  useEffect(() => {
    setActiveCompanyStore(companies[0]);
    if (activeCompanyId) {
      const activeCompany = companies.find(
        (company) => company.id === activeCompanyId
      );
      if (activeCompany) {
        setActiveCompany(activeCompany);
        setActiveCompanyStore(activeCompany);
      } else {
        setActiveCompany(companies[0]);
        setActiveCompanyStore(companies[0]);
      }
    }
  }, [activeCompanyId]);

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
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <UserAvatar
                      imageUrl={activeCompany.logoUrl!}
                      userName={activeCompany.name}
                    />
                  </div>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight relative">
                  <span className="truncate font-semibold">
                    JobVerse
                    <span className=" text-amber-400 text-xs absolute ml-1 -top-[6px]  ">{`${"Pro"}`}</span>
                  </span>
                  <span className="truncate text-xs relative">
                    {activeCompany.name}
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
              {[
                activeCompany,
                ...companies.filter(
                  (company) => company.id !== activeCompany.id
                ),
              ].map((company) => {
                return (
                  <DropdownMenuItem
                    key={company.name}
                    onClick={() => {
                      if (activeCompany.id === company.id) return;
                      setSelectedCompany(company);
                      setOpenCompanySwitcherDialog(true);
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
                );
              })}
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
      {selectedCompany && openCompanySwitcherDialog && (
        <CompanySwitchDialog
          open={openCompanySwitcherDialog}
          setOpen={setOpenCompanySwitcherDialog}
          company={selectedCompany}
          setActiveCompany={setActiveCompany}
        />
      )}
    </>
  );
}
