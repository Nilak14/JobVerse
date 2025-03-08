import { formatDate, getTimeDistance } from "@/lib/utils";
import UserAvatar from "./Useravatar";
import { JobStatus } from "@prisma/client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";

export const UserTableCell = ({
  email,
  username,
  imageUrl,
}: {
  username: string;
  imageUrl: string;
  email: string;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <UserAvatar
          classname="h-7 w-7"
          imageUrl={imageUrl}
          userName={username}
        />
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex items-center gap-4">
          <UserAvatar
            classname="h-7 w-7"
            imageUrl={imageUrl}
            userName={username}
          />
          <div className="">
            <p>{username}</p>
            <p className=" text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export const DateTableCell = ({
  date,
  prefix,
  suffix,
}: {
  date: Date;
  suffix?: string;
  prefix?: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <p>{formatDate(date)}</p>
      <p className="text-xs text-muted-foreground">
        {prefix} {getTimeDistance(date)} {suffix}
      </p>
    </div>
  );
};

export const NumberTableCell = ({ number }: { number: number | string }) => {
  return (
    <p className="bg-background border-input border-2 text-sm px-3 py-1.5 rounded-lg flex items-center justify-center w-10 h-10 tabular-nums">
      {number}
    </p>
  );
};

export const JobStatusBadge = ({ status }: { status: JobStatus }) => {
  const statusStyles: Record<JobStatus, string> = {
    ACTIVE: "text-green-600 border-green-600 bg-green-600/10",
    REJECTED: "text-red-600 border-red-600 bg-red-600/10",
    PENDING: "text-yellow-600 border-yellow-600 bg-yellow-600/10",
    DRAFT: "text-purple-600 border-purple-600 bg-purple-600/10",
    DELETED: "text-red-600 border-red-600 bg-red-600/10",
    NEED_REVIEW: "text-red-600 border-red-600 bg-red-600/10",
    EXPIRED: "text-orange-600 border-orange-600 bg-orange-600/10",
    PAUSED: "text-blue-600 border-blue-600 bg-blue-600/10",
  };

  const statusText: Record<JobStatus, string> = {
    ACTIVE: "ACTIVE",
    REJECTED: "Rejected",
    PENDING: "Pending",
    DRAFT: "Draft",
    DELETED: "Deleted",
    EXPIRED: "Expired",
    NEED_REVIEW: "Need Review",
    PAUSED: "Closed",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${statusStyles[status]}`}
    >
      {statusText[status]}
    </span>
  );
};

type CompanyJobCellType = {
  logoUrl: string | null;
  name: string;
  adminEmployer: {
    user: {
      email: string;
      name: string | null;
      image: string | null;
    };
  };
};

interface CompanyTableCellProps {
  company: CompanyJobCellType;
  creator: {
    user: {
      email: string;
      name: string | null;
      image: string | null;
    };
  };
}
export const CompanyTableCell = ({
  company: { logoUrl, name, adminEmployer },
  creator,
}: CompanyTableCellProps) => {
  const [open, setOpen] = useState(false);
  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger onClick={() => setOpen(!open)}>
        <UserAvatar classname="h-7 w-7" imageUrl={logoUrl!} userName={name} />
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex items-center gap-4">
          <UserAvatar classname="h-7 w-7" imageUrl={logoUrl!} userName={name} />
          <div className="">
            <p>{name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <p className="text-xs text-muted-foreground"> Admin:</p>
          <UserAvatar
            classname="h-7 w-7"
            imageUrl={adminEmployer.user.image!}
            userName={adminEmployer.user.name!}
          />
          <div>
            <p>{adminEmployer.user.name}</p>
            <p className=" text-xs text-muted-foreground">
              {adminEmployer.user.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <p className="text-xs text-muted-foreground"> Job Creator:</p>
          <UserAvatar
            classname="h-7 w-7"
            imageUrl={creator.user.image!}
            userName={creator.user.name!}
          />
          <div>
            <p>{creator.user.name}</p>
            <p className=" text-xs text-muted-foreground">
              {creator.user.email}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
