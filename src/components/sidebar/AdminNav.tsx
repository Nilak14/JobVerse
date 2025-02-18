import Container from "../Global/Container";
import NavLogo from "../Global/NavLogo";
import Notification from "../Global/Notification";
import { Logo } from "../LandingPage/NavBar";
import { NavUser } from "./NavUser";
import { UserNavProps } from "@/lib/types";

const AdminNav = ({ hasSidebar = false, user }: UserNavProps) => {
  return (
    <header>
      <Container className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-sidebar shadow-sm shadow-muted-foreground">
        <section className="flex-1  h-full flex items-center">
          {hasSidebar || <NavLogo />}
        </section>
        <section className="flex-1  h-full flex items-center justify-end gap-10 ">
          <div className="">
            <Notification />
          </div>
          {hasSidebar || (
            <div>
              <NavUser user={user} isLoading={!user} />
            </div>
          )}
        </section>
      </Container>
    </header>
  );
};
export default AdminNav;
