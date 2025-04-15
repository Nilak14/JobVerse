"use client";

import { SortableHeader } from "@/components/Global/SortableHeader";
import { JobServerData } from "@/lib/prisma-types/Job";
import { ColumnDef } from "@tanstack/react-table";
import {
  DateTableCell,
  JobStatusBadge,
  NumberTableCell,
  UserTableCell,
} from "@/components/Global/TableRowComponents";

import JobTableRowAction from "@/components/Job/JobTableRowAction";
export const companyJobsColumn: ColumnDef<JobServerData>[] = [
  {
    accessorKey: "createdBy",

    id: "Created By",
    header: ({ column }) => {
      return <p className="">Created By</p>;
    },
    cell: ({ row }) => {
      return (
        <UserTableCell
          email={row.original.creator.user.email || ""}
          imageUrl={row.original.creator.user.image || ""}
          username={row.original.creator.user.name || ""}
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Job Title",
  },

  {
    // console.log(jobs[0]._count.applications);
    accessorKey: "_count.applications",
    header: "Applicants",
    cell: ({ row }) => {
      return <NumberTableCell number={row.original._count.applications} />;
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <SortableHeader
          ascText="Oldest"
          descText="Newest"
          column={column}
          title="Posted At"
        />
      );
    },
    cell: ({ row }) => {
      return <DateTableCell suffix="ago" date={row.original.createdAt} />;
    },
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => {
      return <SortableHeader column={column} title="Expires At" />;
    },
    cell: ({ row }) => {
      return row.original.deadline ? (
        <DateTableCell prefix="After" date={row.original.deadline} />
      ) : (
        <p className="">N/A</p>
      );
    },
  },
  {
    accessorKey: "status",
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      return <JobStatusBadge status={row.original.status} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <JobTableRowAction
          isSlackOn={row.original.sendEmailNotification}
          message={row.original.review?.reviewedComment}
          id={row.original.id}
          companyId={row.original.companyId!}
          status={row.original.status}
          jobTitle={row.original.title || ""}
        />
      );
    },
  },
];
