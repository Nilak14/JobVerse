import Container from "@/components/Global/Container";
import Notification from "@/components/Global/Notification";
import { NavUser } from "@/components/sidebar/NavUser";
import { ExtendedUser } from "@/next-auth";
import NavLogo from "@/components/Global/NavLogo";

interface BrowsePageTopProps {
  user: ExtendedUser;
}

const BrowsePageTop = ({ user }: BrowsePageTopProps) => {
  return (
    <>
      <Container className="flex h-16 shrink-0 items-center gap-2 bg-sidebar">
        <NavLogo />
        <section className="flex-1 h-full flex items-center justify-end gap-10">
          <div className="">
            <Notification />
          </div>

          <div>
            <NavUser user={user} />
          </div>
        </section>
      </Container>
    </>
  );
};

export default BrowsePageTop;
