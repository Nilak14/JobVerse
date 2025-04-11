"use client";

import { SortableHeader } from "@/components/Global/SortableHeader";
import { DateTableCell } from "@/components/Global/TableRowComponents";
import UserAvatar from "@/components/Global/Useravatar";
import AllUserTableAction from "@/components/Job/AllUserTableAction";
import { Badge } from "@/components/ui/badge";
import { AllUsers } from "@/lib/prisma-types/User";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, Mail, X } from "lucide-react";
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

export const AllUserColumn: ColumnDef<AllUsers>[] = [
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) => {
      return <p className="">User</p>;
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <UserAvatar
            userName={row.original.name!}
            imageUrl={row.original.image!}
          />
          <p> {row.original.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    id: "email",
    header: ({ column }) => {
      return <p className="">Email</p>;
    },
    cell: ({ row }) => {
      return (
        <p className="flex items-center gap-2">
          {row.original.email}
          <span>
            {row.original.emailVerified && (
              <CheckCircle className="text-blue-500 w-4 h-4" />
            )}
          </span>
        </p>
      );
    },
  },
  {
    accessorKey: "userType",
    id: "type",
    header: ({ column }) => {
      return <p className="">Type</p>;
    },
    cell: ({ row }) => {
      const adminColor = "bg-green-200 text-green-500";
      const employerColor = "bg-orange-200 text-orange-500";
      const jobSeekerColor = "bg-blue-200 text-blue-500";
      return (
        <p
          className={`rounded-md  px-2 py-1 text-xs font-semibold ${
            row.original.userType === "ADMIN"
              ? adminColor
              : row.original.userType === "EMPLOYER"
                ? employerColor
                : jobSeekerColor
          }`}
        >
          {row.original.userType}
        </p>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "password",
    id: "provider",
    header: ({ column }) => {
      return <p className="">Provider</p>;
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          {!row.original.password ? (
            <FcGoogle className="w-5 h-5" />
          ) : (
            <p>
              <Mail />
            </p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "isBlocked",
    id: "status",
    header: ({ column }) => {
      return <p className="">Status</p>;
    },
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.isBlocked ? "destructive" : "secondary"}>
          {row.original.isBlocked ? "Blocked" : "Active"}
        </Badge>
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
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <SortableHeader
          ascText="Oldest"
          descText="Newest"
          column={column}
          title="Joined At"
        />
      );
    },
    cell: ({ row }) => {
      return <DateTableCell suffix="ago" date={row.original.createdAt} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <AllUserTableAction user={row.original} />;
    },
  },
];
