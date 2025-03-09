import { Loader2, WandSparklesIcon } from "lucide-react";
import { RefObject } from "react";
import { ButtonProps } from "../ui/button";
import { ShinyButton } from "../ui/shiny-button";

interface AIButtonProps extends ButtonProps {
  loading: boolean;
  disabled?: boolean;
  className?: string;
  showIconOnly?: boolean;
  ref?: RefObject<HTMLButtonElement | null>;
  text?: string;
}
const AIButton = ({
  loading,
  disabled,
  className,
  ref,
  text = "Generate (AI)",
  ...props
}: AIButtonProps) => {
  return (
    <ShinyButton
      ref={ref && ref}
      disabled={loading || disabled}
      className="border-2"
      onClick={props.onClick}
    >
      <div className="flex items-center gap-3">
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <WandSparklesIcon className="size-5" />
        )}
        {text}
      </div>
    </ShinyButton>
  );
};
export default AIButton;
