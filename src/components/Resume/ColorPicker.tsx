import { useState } from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PaletteIcon } from "lucide-react";
import { Button } from "../ui/button";
interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}
const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setShowPopover(true)}
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
