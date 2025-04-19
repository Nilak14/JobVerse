import * as React from "react";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon | React.JSX.ElementType;
  endIcon?: LucideIcon | React.JSX.ElementType;
  endIconAction?: () => void;
  startIconAction?: () => void;
  endIconClassName?: React.ComponentProps<"button">["className"];
  startIconClassName?: React.ComponentProps<"button">["className"];
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      endIconClassName,
      startIconClassName,
      type,
      startIcon,
      endIcon,
      endIconAction,
      startIconAction,
      ...props
    },
    ref
  ) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    return (
      <div className="w-full relative">
        {StartIcon && (
          <button
            type="button"
            onClick={startIconAction && startIconAction}
            className={cn(
              "absolute left-1.5 top-1/2 transform -translate-y-1/2",
              startIconClassName
            )}
          >
            <StartIcon size={18} className="text-muted-foreground" />
          </button>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-white dark:bg-background py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            startIcon ? "pl-8 " : "",
            endIcon ? "pr-8" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <button
            type="button"
            onClick={endIconAction && endIconAction}
            className={cn(
              "absolute right-3 top-1/2 transform -translate-y-1/2",
              endIconClassName
            )}
          >
            <EndIcon className="text-muted-foreground" size={18} />
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
