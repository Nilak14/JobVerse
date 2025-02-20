import Container from "../Global/Container";
import NavLogo from "../Global/NavLogo";
import Notification from "../Global/Notification";

import { NavUser } from "./NavUser";
import { UserNavProps } from "@/lib/types";

const JobSeekerNav = ({ user, hasSidebar = false }: UserNavProps) => {
  return (
    <header className="sticky top-0 z-10 ">
      <Container className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-sidebar ">
        <section className="flex-1  h-full flex items-center">
          {hasSidebar || (
            <>
              <NavLogo />
            </>
          )}
        </section>
        <section className="flex-1  h-full flex items-center justify-end gap-10 ">
          <div className="">
            <Notification />
          </div>

          {hasSidebar || (
            <div>{user && <NavUser user={user} isLoading={!user} />}</div>
          )}
        </section>
      </Container>
    </header>
  );
};
export default JobSeekerNav;
