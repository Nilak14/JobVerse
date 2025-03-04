"use client";

import ApplicationTableAction from "@/components/applications/ApplicationTableAction";
import ApplicationStatusBadge from "@/components/Global/ApplicationStatusBadge";

import { SortableHeader } from "@/components/Global/SortableHeader";
import { DateTableCell } from "@/components/Global/TableRowComponents";
import UserAvatar from "@/components/Global/Useravatar";
import { JobApplication } from "@/lib/prisma-types/Application";
import { ColumnDef } from "@tanstack/react-table";

export const jobApplicationColumn: ColumnDef<JobApplication>[] = [
  {
    accessorKey: "job.title",
    id: "Job",
    header: "Job",
    cell: ({ row }) => {
      return <p>{row.original.job.title}</p>;
    },
  },
  {
    accessorKey: "job.company.name",
    id: "Company",
    header: "Company",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <UserAvatar
            imageUrl={row.original.job.company.logoUrl!}
            userName={row.original.job.company.name!}
          />
          <div>
            <p>{row.original.job.company.name}</p>
            <p className="text-xs font-bold text-muted-foreground">
              {row.original.job.workMode}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    id: "Applied At",
    header: ({ column }) => {
      return (
        <SortableHeader
          ascText="Oldest"
          descText="Newest"
          column={column}
          title="Applied At"
        />
      );
    },
    cell: ({ row }) => {
      return <DateTableCell suffix="ago" date={row.original.createdAt} />;
    },
  },
  {
    accessorKey: "status",
    id: "Status",
    header: "Status",
    cell: ({ row }) => {
      return <ApplicationStatusBadge status={row.original.status} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <ApplicationTableAction application={row.original} />;
    },
  },
];
