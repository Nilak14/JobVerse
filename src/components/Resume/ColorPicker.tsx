import { useState } from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PaletteIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useJobSeekerSubscriptionLevel } from "@/context/JobSeekerSubscriptionLevelProvider";
import usePremiumModal from "@/store/usePremiumModal";
import { canUseCustomizations } from "@/lib/permissions/jobSeeker-permissions";
interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}
const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const [showPopover, setShowPopover] = useState(false);
  const subscriptionLevel = useJobSeekerSubscriptionLevel();
  const { setOpenPremiumModal } = usePremiumModal();
  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => {
            if (!canUseCustomizations(subscriptionLevel)) {
              setOpenPremiumModal(true);
              return;
            }
            setShowPopover(true);
          }}
          title="Change Resume Color"
          size={"icon"}
          variant={"outline"}
        >
          <PaletteIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none bg-transparent shadow-none"
        align="end"
      >
        <TwitterPicker triangle="top-right" color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
};
export default ColorPicker;
