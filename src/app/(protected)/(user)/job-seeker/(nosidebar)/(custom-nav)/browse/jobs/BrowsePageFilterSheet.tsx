import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { PropsWithChildren } from "react";
const BrowsePageFilterSheet = ({ children }: PropsWithChildren) => {
  return (
    <Sheet>
      <SheetTrigger className="w-full" asChild>
        <Button size={"icon"}>
          <Filter />
          <span>View Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent>{children}</SheetContent>
    </Sheet>
  );
};
export default BrowsePageFilterSheet;
