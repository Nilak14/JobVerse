import { Bell } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Notification = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger
          title="Notifications"
          className="relative  h-9 w-9 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2  active:scale-95 transition-transform duration-300 whitespace-nowrap rounded-md text-sm font-medium  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          <Bell className=" size-5 text-primary" />
          <span className="absolute -right-1 -top-1 rounded-full bg-primary text-white px-1 text-xs font-medium tabular-nums">
            2
          </span>
        </PopoverTrigger>
        <PopoverContent>Your Notifications</PopoverContent>
      </Popover>
    </>
  );
};
export default Notification;
