import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserAvatarProps {
  imageUrl: string;
  userName: string;
  classname?: string;
}
const UserAvatar = ({ imageUrl, userName, classname }: UserAvatarProps) => {
  return (
    <Avatar className={cn("size-8 rounded-lg", classname)}>
      <AvatarImage
        alt={userName}
        src={imageUrl}
        width={32}
        height={32}
        className="object-cover"
      />
      <AvatarFallback className="rounded-lg bg-primary">
        {userName.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
export default UserAvatar;
