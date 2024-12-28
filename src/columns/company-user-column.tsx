"use client";

import { HidableHeader } from "@/components/Global/HidableHeader";
import { SortableAndHidableHeader } from "@/components/Global/SortableAndHidableHeader";
import { SortableHeader } from "@/components/Global/SortableHeader";
import UserAvatar from "@/components/Global/Useravatar";
import { CompanyEmployer } from "@/lib/prisma-types/Employers";
import { ColumnDef } from "@tanstack/react-table";

export const companyEmployerColumns: ColumnDef<CompanyEmployer>[] = [
  {
    accessorKey: "user.image",
    header: "Avatar",
    cell: ({ row }) => {
      return (
        <UserAvatar
          imageUrl={row.original.user.image!}
          userName={row.original.user.name || "X"}
        />
      );
    },
  },
  {
    accessorKey: "user.name",
    id: "name",
    header: ({ column }) => {
      return <SortableAndHidableHeader column={column} title="Name" />;
    },
  },

  {
    accessorKey: "user.email",
    header: "Email",
  },
];
