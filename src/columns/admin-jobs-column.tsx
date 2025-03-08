"use client";

import { SortableHeader } from "@/components/Global/SortableHeader";
import { JobServerDataAdmin } from "@/lib/prisma-types/Job";
import { ColumnDef } from "@tanstack/react-table";
import {
  CompanyTableCell,
  DateTableCell,
  JobStatusBadge,
  NumberTableCell,
} from "@/components/Global/TableRowComponents";

import JobTableRowActionAdmin from "@/components/Job/JobTableRowActionAdmin";
export const AdminAllJobsColumn: ColumnDef<JobServerDataAdmin>[] = [
  {
    accessorKey: "createdBy",

    id: "Company",
    header: ({ column }) => {
      return <p className="">Company</p>;
    },
    cell: ({ row }) => {
      return (
        <CompanyTableCell
          creator={row.original.creator}
          company={row.original.company}
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Job Title",
  },
  {
    accessorKey: "view",
    header: "Views",
    cell: ({ row }) => {
      return <NumberTableCell number={100} />;
    },
  },
  {
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
        <JobTableRowActionAdmin
          job={row.original}
          status={row.original.status}
        />
      );
    },
  },
];
