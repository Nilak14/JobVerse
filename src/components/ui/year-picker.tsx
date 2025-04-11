"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface YearPickerProps {
  onChange?: (year: number) => void;
  defaultYear?: number;
  className?: string;
}

export function YearPicker({
  onChange,
  defaultYear = new Date().getFullYear(),
  className,
}: YearPickerProps) {
  const [year, setYear] = useState<number>(defaultYear);
  const [open, setOpen] = useState(false);

  // Generate years from current year to 10 years ago
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);

  const handleYearSelect = (selectedYear: number) => {
    setYear(selectedYear);
    onChange?.(selectedYear);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[120px] justify-between", className)}
        >
          {year}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[120px] p-0">
        <ScrollArea className="h-[200px]">
          <div className="flex flex-col">
            {years.map((yearOption) => (
              <Button
                key={yearOption}
                variant="ghost"
                className={cn(
                  "justify-start rounded-none",
                  year === yearOption && "bg-accent font-medium"
                )}
                onClick={() => handleYearSelect(yearOption)}
              >
                {yearOption}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
