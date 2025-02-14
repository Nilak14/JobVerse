import Container from "@/components/Global/Container";
import Notification from "@/components/Global/Notification";
import { Logo } from "@/components/LandingPage/NavBar";
import { NavUser } from "@/components/sidebar/NavUser";
import { SidebarUser } from "@/components/sidebar/SidebarUser";
import { Input } from "@/components/ui/input";
import { ExtendedUser } from "@/next-auth";
import { Search } from "lucide-react";

interface BrowsePageTopProps {
  user: ExtendedUser;
}

const BrowsePageTop = ({ user }: BrowsePageTopProps) => {
  return (
    <header>
      <Container className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-sidebar shadow-sm shadow-muted-foreground fixed top-0">
        <section className="flex-1  h-full flex items-center">
          <Logo showText={false} fill="#e9590c" height="40" width="40" />
        </section>
        <section className="flex-1  h-full flex items-center justify-end gap-10 ">
          <div className="">
            <Notification />
          </div>

          <div>
            <NavUser isNav user={user} isLoading={!user} />
          </div>
        </section>
        <div className="">
          <Input placeholder="Find Jobs" startIcon={Search} />
        </div>
      </Container>
    </header>
  );
};
export default BrowsePageTop;
