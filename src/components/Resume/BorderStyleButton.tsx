import { Circle, Square, Squircle } from "lucide-react";
import { Button } from "../ui/button";

export const BorderStyles = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQURICLE: "squircle",
};
const borderStyles = Object.values(BorderStyles);

interface BorderStyleButtonProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}
const BorderStyleButton = ({
  borderStyle,
  onChange,
}: BorderStyleButtonProps) => {
  function handleClick() {
    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const newIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[newIndex]);
  }
  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
        ? Circle
        : Squircle;
  return (
    <Button
      variant={"outline"}
      size={"icon"}
      title="Change Border Style"
      onClick={handleClick}
    >
      <Icon size={"5"} />
    </Button>
  );
};
export default BorderStyleButton;
