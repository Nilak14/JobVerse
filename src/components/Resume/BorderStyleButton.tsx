import { Circle, Square, Squircle } from "lucide-react";
import { Button } from "../ui/button";
import { useJobSeekerSubscriptionLevel } from "@/context/JobSeekerSubscriptionLevelProvider";
import usePremiumModal from "@/store/usePremiumModal";
import { canUseCustomizations } from "@/lib/permissions/jobSeeker-permissions";

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
  const subscriptionLevel = useJobSeekerSubscriptionLevel();
  const { setOpenPremiumModal } = usePremiumModal();
  function handleClick() {
    if (!canUseCustomizations(subscriptionLevel)) {
      setOpenPremiumModal(true);
      return;
    }
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
