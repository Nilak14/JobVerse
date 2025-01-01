"use client";

import { SortableHeader } from "@/components/Global/SortableHeader";
import UserAvatar from "@/components/Global/Useravatar";
import { CompanyEmployerTableData } from "@/data-access/company/getCompanyEmployer";
import { ColumnDef } from "@tanstack/react-table";

export const companyEmployerColumns: ColumnDef<CompanyEmployerTableData[0]>[] =
  [
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
        return <SortableHeader column={column} title="Name" />;
      },
    },

    {
      accessorKey: "user.email",
      header: "Email",
    },
    {
      accessorKey: "invitedBy.name",
      header: "Invited By",
      cell: ({ row }) => {
        if (row.original.invitedBy.name === "Admin") {
          return <p>Admin</p>;
        }
        return (
          <div className="flex items-center gap-2">
            <UserAvatar
              imageUrl={row.original.invitedBy.image!}
              userName={row.original.invitedBy.name || "X"}
            />
            <p>{row.original.invitedBy.name}</p>
          </div>
        );
      },
    },
  ];
