"use client";

import { useState } from "react";
import {
  format,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  subDays,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn, formatDateRange } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type DateOption =
  | "today"
  | "yesterday"
  | "thisMonth"
  | "last7Days"
  | "lastMonth"
  | "custom";

export interface DateRangeValue {
  dateOption: DateOption;
  range: {
    from: Date;
    to: Date;
  };
}

export interface DateRangeSelectorProps {
  /** Current value - for controlled component */
  value?: DateRangeValue;
  /** Change handler - for controlled component */
  onValueChange?: (value: DateRangeValue) => void;
  /** Default value - for uncontrolled component */
  defaultValue?: DateRangeValue;
  /** Additional class name */
  className?: string;
}

export default function DateRangeSelector({
  value,
  onValueChange,
  defaultValue = {
    dateOption: "today",
    range: {
      from: startOfDay(new Date()),
      to: endOfDay(new Date()),
    },
  },
  className,
}: DateRangeSelectorProps) {
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] =
    useState<DateRangeValue>(defaultValue);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Determine if component is controlled
  const isControlled = value !== undefined;

  // Use either controlled or uncontrolled value
  const currentValue = isControlled ? value : internalValue;

  // Update handler that works for both controlled and uncontrolled modes
  const handleValueChange = (newValue: DateRangeValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  // Calculate date range based on selected option
  const updateDateRange = (option: DateOption) => {
    const now = new Date();
    let newRange: { from: Date; to: Date };

    switch (option) {
      case "today":
        newRange = {
          from: startOfDay(now),
          to: endOfDay(now),
        };
        break;
      case "yesterday":
        const yesterday = subDays(now, 1);
        newRange = {
          from: startOfDay(yesterday),
          to: endOfDay(yesterday),
        };
        break;
      case "thisMonth":
        newRange = {
          from: startOfMonth(now),
          to: endOfMonth(now),
        };
        break;
      case "last7Days":
        newRange = {
          from: startOfDay(subDays(now, 6)),
          to: endOfDay(now),
        };
        break;
      case "lastMonth":
        const lastMonth = subDays(startOfMonth(now), 1);
        newRange = {
          from: startOfMonth(lastMonth),
          to: endOfMonth(lastMonth),
        };
        break;
      case "custom":
        // For custom, keep the existing range
        return {
          dateOption: option,
          range: currentValue.range,
        };
      default:
        return currentValue;
    }

    return {
      dateOption: option,
      range: newRange,
    };
  };

  // Handle option change
  const handleOptionChange = (option: DateOption) => {
    const newValue = updateDateRange(option);
    handleValueChange(newValue);

    if (option === "custom") {
      handleValueChange(newValue);
      setIsCalendarOpen(true);
    } else {
      setIsCalendarOpen(false);
    }
  };

  // Handle date range selection in the calendar
  const handleDateRangeSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      const newValue = {
        dateOption: "custom" as DateOption,
        range: {
          from: startOfDay(range.from),
          to: endOfDay(range.to),
        },
      };

      handleValueChange(newValue);
      setIsCalendarOpen(false);
    }
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="self-end">
        <Select
          value={currentValue.dateOption}
          onValueChange={(value) => handleOptionChange(value as DateOption)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="last7Days">Last 7 Days</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {currentValue.dateOption === "custom" && (
        <div className="relative mt-1">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal")}
                onClick={() => setIsCalendarOpen(true)}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDateRange(currentValue) || "Select date range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start" side="bottom">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={currentValue.range.from}
                selected={{
                  from: currentValue.range.from,
                  to: currentValue.range.to,
                }}
                onSelect={handleDateRangeSelect}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* {currentValue.dateOption !== "custom" && (
        <div className="text-sm text-muted-foreground mt-1 text-right">
          {formatDateRange()}
        </div>
      )} */}
    </div>
  );
}
