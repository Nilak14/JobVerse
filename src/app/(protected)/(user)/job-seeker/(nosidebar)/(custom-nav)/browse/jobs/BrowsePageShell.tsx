import Container from "@/components/Global/Container";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface BrowsePageShellProps {
  children: React.ReactNode;
}
const BrowsePageShell = ({ children }: BrowsePageShellProps) => {
  return (
    <Container className="bg-background w-full h-fit ">
      <div className="">
        <Input placeholder="Find Jobs" startIcon={Search} />
      </div>
    </Container>
  );
};
export default BrowsePageShell;
