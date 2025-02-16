import { cn } from "@/lib/utils";
import { Button } from "./button";

interface LinkButtonAnimatedProps {
  children?: React.ReactNode;
  containerClassName?: string;
  lineClassName?: string;
}

const LinkButtonAnimated = ({
  children,
  containerClassName,
  lineClassName,
}: LinkButtonAnimatedProps) => {
  return (
    <div>
      <button
        className={cn(
          "group relative text-sm text-primary font-medium active:scale-95",
          containerClassName
        )}
      >
        {children}
        <div
          className={cn(
            "bg-primary w-0  h-[1.5px] group-hover:w-full transition-all duration-300 ease-in-out  block absolute right-0 ",
            lineClassName
          )}
        ></div>
      </button>
    </div>
  );
};
export default LinkButtonAnimated;
