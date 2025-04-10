import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const option = [
  {
    label: "Job Seeker",
    value: "JOB_SEEKER",
  },
  {
    label: "Employer",
    value: "EMPLOYER",
  },
  {
    label: "Admin",
    value: "ADMIN",
  },
];
const premiumOption = [
  {
    label: "Elite",
    value: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ELITE_MONTHLY!,
  },
  {
    label: "Pro",
    value: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY!,
  },
  {
    label: "Non Premium",
    value: "FREE",
  },
];

export function AdminCompanyTableFilter<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search By Name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("isPremium") && (
          <DataTableFacetedFilter
            column={table.getColumn("isPremium")}
            title="Premium"
            options={premiumOption}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
export default AdminCompanyTableFilter;
