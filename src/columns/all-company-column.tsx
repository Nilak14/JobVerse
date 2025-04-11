"use client";

import { SortableHeader } from "@/components/Global/SortableHeader";
import { DateTableCell } from "@/components/Global/TableRowComponents";
import UserAvatar from "@/components/Global/Useravatar";
import AllUserTableAction from "@/components/Job/AllUserTableAction";
import { Badge } from "@/components/ui/badge";
import { AllCompanyInclude } from "@/lib/prisma-types/Company";
import { AllUsers } from "@/lib/prisma-types/User";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Check, CheckCircle, Mail, X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const getSubscriptionName = (priceId: string) => {
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY) {
    return "Pro";
  } else if (
    priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ELITE_MONTHLY
  ) {
    return "Elite";
  }
};

export const AllCompanyColumn: ColumnDef<AllCompanyInclude>[] = [
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) => {
      return <p className="">Company</p>;
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <UserAvatar
            userName={row.original.name!}
            imageUrl={row.original.logoUrl!}
          />
          <p> {row.original.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "adminEmployer.user",
    id: "Creator",
    header: ({ column }) => {
      return <p className="">Creator</p>;
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <UserAvatar
            userName={row.original.adminEmployer.user.name!}
            imageUrl={row.original.adminEmployer.user.image!}
          />
          <p> {row.original.adminEmployer.user.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "adminEmployer.user.email",
    id: "email",
    header: ({ column }) => {
      return <p className="">Creator Email</p>;
    },
    cell: ({ row }) => {
      return (
        <p className="flex items-center gap-2">
          {row.original.adminEmployer.user.email}
        </p>
      );
    },
  },
  {
    accessorKey: "_count.members",
    id: "members",
    header: ({ column }) => {
      return <p className="">Total Members</p>;
    },
    cell: ({ row }) => {
      return (
        <p className="flex items-center gap-2">
          {row.original._count.members} Members
        </p>
      );
    },
  },
  {
    accessorKey: "_count.jobPosted",
    id: "jobPosted",
    header: ({ column }) => {
      return <p className="">Total Job Posted</p>;
    },
    cell: ({ row }) => {
      return (
        <p className="flex items-center gap-2">
          {row.original._count.jobPosted} Jobs
        </p>
      );
    },
  },
  {
    accessorKey: "subscriptions.stripePriceId",
    accessorFn: (row) => {
      return row.subscriptions?.stripePriceId || "FREE";
    },
    id: "isPremium",
    header: ({ column }) => {
      return <p className="">Subscription</p>;
    },
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.subscriptions ? (
            <X className="text-destructive" />
          ) : (
            <div>
              <p className="flex  gap-2 flex-col">
                {getSubscriptionName(row.original.subscriptions.stripePriceId)}
                <span className="text-destructive text-xs">
                  {formatDate(
                    row.original.subscriptions.stripeCurrentPeriodEnd
                  )}
                </span>
              </p>
            </div>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "isDeleted",
    id: "isDeleted",
    header: ({ column }) => {
      return <p className="">Is Deleted</p>;
    },
    cell: ({ row }) => {
      return (
        <p className="flex items-center gap-2">
          {row.original.isDeleted ? (
            <Check className="text-green-600" />
          ) : (
            <X className="text-destructive" />
          )}
        </p>
      );
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
          title="Created At"
        />
      );
    },
    cell: ({ row }) => {
      return <DateTableCell suffix="ago" date={row.original.createdAt} />;
    },
  },
];
