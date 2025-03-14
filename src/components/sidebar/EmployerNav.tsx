import Container from "../Global/Container";
import Notification from "../Global/Notification";
import { UserNavProps } from "@/lib/types";
import { NavUser } from "./NavUser";
import NavLogo from "../Global/NavLogo";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import ActiveCompany from "./ActiveCompany";

const EmployerNav = ({
  hasSidebar = false,
  user,
  activeCompanyId,
}: UserNavProps) => {
  if (!user) return null;
  return (
    <>
      <ActiveCompany activeCompanyId={activeCompanyId} />

      <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 bg-background z-50 ">
        <div className="flex flex-1 items-center justify-center gap-2 h-16 px-3  border-b border-muted-foreground/40">
          {hasSidebar && (
            <>
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </>
          )}
          <Container className=" w-full flex justify-between items-center gap-10 ">
            <div>{hasSidebar || <NavLogo />}</div>
            <div className="flex gap-10">
              <Notification />
              {hasSidebar || <div>{user && <NavUser user={user} />}</div>}
            </div>
          </Container>
        </div>
      </header>
    </>
  );
};
export default EmployerNav;
