import { ExtendedUser } from "@/next-auth";
import Container from "../Global/Container";
import Notification from "../Global/Notification";
import ThemeSelect from "../Global/ThemeSelect";
import { Logo } from "../LandingPage/NavBar";
import { SidebarUser } from "./SidebarUser";

interface CompanyNavProps {
  hasSidebar?: boolean;
  user: ExtendedUser;
}
const CompanyNav = ({ hasSidebar = false, user }: CompanyNavProps) => {
  return (
    <header>
      <Container className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-sidebar shadow-sm shadow-muted-foreground">
        <section className="flex-1  h-full flex items-center">
          {hasSidebar || (
            <Logo showText={false} fill="#e9590c" height="40" width="40" />
          )}
        </section>
        <section className="flex-1  h-full flex items-center justify-end gap-10 ">
          <div className="">
            <Notification />
          </div>
          {hasSidebar || (
            <div>
              <SidebarUser isNav user={user} isLoading={!user} />
            </div>
          )}
          {/* <div>
            <ThemeSelect />
          </div> */}
        </section>
      </Container>
    </header>
  );
};
export default CompanyNav;
