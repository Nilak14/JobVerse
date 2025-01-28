"use client";

import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Dispatch, forwardRef, SetStateAction, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";
type Props = InputProps & {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
};

export const InputTags = forwardRef<HTMLInputElement, Props>(
  ({ onChange, value, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = useState("");
    const [focused, setFocused] = useState(false);
    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    };

    const { setFocus } = useFormContext();

    return (
      <div
        onClick={() => setFocus("tags")}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          focused
            ? "ring-offset-2 outline-none ring-ring ring-2"
            : "ring-offset-0 outline-none ring-ring ring-0"
        )}
      >
        <motion.div className="rounded-md min-h-[2.5rem] p-2 flex gap-2 flex-wrap items-center">
          <AnimatePresence>
            {value.map((tag) => (
              <motion.div
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                key={tag}
              >
                <Badge variant={"secondary"}>
                  {tag}
                  <button type="button">
                    <XIcon
                      className="w-4 h-4 ml-2 "
                      onClick={() => onChange(value.filter((i) => i !== tag))}
                    />
                  </button>
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex">
            <Input
              placeholder="Add Tags"
              className="focus-visible:border-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addPendingDataPoint();
                }
                if (
                  e.key === "Backspace" &&
                  !pendingDataPoint &&
                  value.length > 0
                ) {
                  e.preventDefault();
                  const newValue = [...value];
                  newValue.pop();
                  onChange(newValue);
                }
              }}
              value={pendingDataPoint}
              onFocus={(e) => setFocused(true)}
              onBlurCapture={(e) => setFocused(false)}
              onChange={(e) => setPendingDataPoint(e.target.value)}
              {...props}
            />
          </div>
        </motion.div>
      </div>
    );
  }
);

InputTags.displayName = "InputTags";
