import { MousePointer2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface SideProps {
  content: string;
  rotate?: boolean;
}
const Side = ({ content, rotate }: SideProps) => {
  return (
    <div className="flex relative">
      <MousePointer2
        size={25}
        className={cn(
          `text-primary fill-primary absolute -top-5 ${rotate ? "-left-5 -rotate-[10deg]" : "-right-5 rotate-[99deg]"}`
        )}
      />
      <Badge className="py-1 text-[0.6rem] hover:bg-primary">{content}</Badge>
    </div>
  );
};
export default Side;
