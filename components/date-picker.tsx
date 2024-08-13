import * as React from "react";
import { format, subDays } from "date-fns";
import { SelectSingleEventHandler } from "react-day-picker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";

interface DatePickerProps {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disabeld?: boolean;
}

export default function DatePicker({
  value,
  onChange,
  disabeld,
}: DatePickerProps) {
  // Get today's date
  const today = new Date();
  // Calculate the date 30 days ago
  const thirtyDaysAgo = subDays(today, 30);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabeld}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabeld}
          initialFocus
          // Disable dates before 30 days ago and after today
          modifiers={{
            disabled: [
              { before: thirtyDaysAgo }, // Disable dates before 30 days ago
              { after: today }, // Disable dates after today
            ],
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
