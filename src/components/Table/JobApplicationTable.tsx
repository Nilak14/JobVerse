"use client";
import {
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  PaginationState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useState } from "react";
import { TablePagination } from "../Global/PaginationTable";
import DataTableToolbar from "./TableComponents/data-table-toolbar";
import { Input } from "../ui/input";

interface JVTableClientProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showPagination?: boolean;
  showSerialNumber?: boolean;
}
const JobApplicationTable = <TData, TValue>({
  columns,
  data,
  showPagination = true,
  showSerialNumber = true,
}: JVTableClientProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    initialState: {
      pagination,
    },

    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  const filteredData = table.getRowModel().rows.map((row) => row.original);

  return (
    <div>
      <div className="items-center py-4 absolute right-0 -top-4 hidden lg:flex">
        <Input
          placeholder="Search By Job Title..."
          value={(table.getColumn("Job")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("Job")?.setFilterValue(e.target.value)
          }
          className="py-6 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="hidden lg:block">
        <div className="rounded-md  border overflow-hidden">
          <Table>
            <TableHeader className="relative ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {showSerialNumber && (
                    <TableHead className="bg-primary text-white w-24 pl-4 ">
                      <p>SN</p>
                    </TableHead>
                  )}
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        className="bg-primary text-white "
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="h-16"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {showSerialNumber && (
                      <TableCell className="pl-4">{row.index + 1}</TableCell>
                    )}
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="h-24 text-center"
                  >
                    <div className="p-4 text-center">No data</div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {showPagination && (
          <div className=" mt-4">
            <TablePagination table={table} />
          </div>
        )}
      </div>

      {/* <div className="lg:hidden grid grid-cols-1 gap-4  lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
        {filteredData.map((data) => {
          const jobData = data as JobServerData;
          return <JobTableCard key={jobData.id} jobData={jobData} />;
        })}
      </div> */}
    </div>
  );
};
export default JobApplicationTable;
