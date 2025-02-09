import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";

interface UserAvatarProps {
  imageUrl: string;
  userName: string;
  classname?: string;
}
const UserAvatar = ({ imageUrl, userName, classname }: UserAvatarProps) => {
  return (
    <Avatar className={cn("size-8 rounded-lg", classname)}>
      {imageUrl ? (
        <Image
          alt={userName}
          src={imageUrl}
          width={32}
          height={32}
          priority
          className="object-cover"
        />
      ) : (
        <AvatarFallback className="rounded-lg bg-primary text-white">
          {userName.charAt(0)}
        </AvatarFallback>
      )}
    </Avatar>
  );
};
export default UserAvatar;
