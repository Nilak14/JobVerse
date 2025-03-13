import { Bell } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import NotificationContainer from "./NotificationContainer";
import NotificationItemSkeleton from "../skeletons/NotificationItemSkeleton";
import { Button } from "../ui/button";
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
        <PopoverContent
          sideOffset={8}
          align="end"
          className="w-[380px] p-0 shadow-xl rounded-xl overflow-hidden "
        >
          <div className="p-4 flex justify-between items-center">
            <h3 className="font-semibold ">Notifications</h3>
            {true && (
              //   {unreadCount > 0 && (
              <Button
                variant="link"
                size="sm"
                className="text-xs"
                //   onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
          {/* <NotificationItemSkeleton /> */}
          <NotificationContainer />
        </PopoverContent>
      </Popover>
    </>
  );
};
export default Notification;
