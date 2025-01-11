"use client";

import { SortableHeader } from "@/components/Global/SortableHeader";
import UserAvatar from "@/components/Global/Useravatar";
import { CompanyMemberType } from "@/lib/prisma-types/CompanyMember";
import { getTimeDistance } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const companyEmployerColumns: ColumnDef<CompanyMemberType[0]>[] = [
  {
    accessorKey: "user.image",
    header: "Avatar",
    cell: ({ row }) => {
      return (
        <UserAvatar
          imageUrl={row.original.employer.user.image!}
          userName={row.original.employer.user.name || "X"}
        />
      );
    },
  },
  {
    accessorKey: "employer.user.name",
    id: "name",
    header: ({ column }) => {
      return <SortableHeader column={column} title="Name" />;
    },
  },

  {
    accessorKey: "employer.user.email",
    header: "Email",
  },
  {
    accessorKey: "joinedAt",
    header: "Joined",
    cell: ({ row }) => {
      return <p>{getTimeDistance(row.original.joinedAt)} ago</p>;
    },
  },
  // {
  //   accessorKey: "invitedBy.name",
  //   header: "Invited By",
  //   cell: ({ row }) => {
  //     if (row.original.invitedBy.name === "Admin") {
  //       return <p>Admin</p>;
  //     }
  //     return (
  //       <div className="flex items-center gap-2">
  //         <UserAvatar
  //           imageUrl={row.original.invitedBy.image!}
  //           userName={row.original.invitedBy.name || "X"}
  //         />
  //         <p>{row.original.invitedBy.name}</p>
  //       </div>
  //     );
  //   },
  // },
];
