import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

export const DatePicker = ({ date, onDateChange }: DatePickerProps) => {
  return (
    <div className="bg-gradient-secondary p-6 rounded-xl shadow-soft border border-border mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 text-center">Select Date</h2>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-white hover:bg-gray-50",
              "border-border hover:border-primary"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
            {format(date, "EEEE, MMMM do, yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white shadow-medium" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && onDateChange(newDate)}
            initialFocus
            className="pointer-events-auto border-0"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};