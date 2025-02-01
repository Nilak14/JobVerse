import { Dispatch, SetStateAction } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
interface CompanyProfilePreviewProps {
  showDescriptionPreview: boolean;
  setShowDescriptionPreview: Dispatch<SetStateAction<boolean>>;
}
const CompanyProfilePreview = ({
  showDescriptionPreview,
  setShowDescriptionPreview,
}: CompanyProfilePreviewProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          onClick={() => setShowDescriptionPreview(!showDescriptionPreview)}
          size={"icon"}
          variant={"secondary"}
        >
          {showDescriptionPreview ? <Edit /> : <Eye />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {showDescriptionPreview ? "Edit" : "Preview"}
      </TooltipContent>
    </Tooltip>
  );
};
export default CompanyProfilePreview;
