import { Popover } from "../ui/popover";
import { getUnreadNotificationCount } from "@/data-access/notification/getNotificationCount";
import NotificationClient from "./NotificationClient";
import { auth } from "@/lib/auth";
import { signOut } from "@/auth";
const Notification = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    await signOut();
    return;
  }
  const unreadCount = await getUnreadNotificationCount();

  return (
    <>
      <Popover>
        <NotificationClient
          userId={session.user.id}
          notificationCount={unreadCount || 0}
        />
      </Popover>
    </>
  );
};
export default Notification;
