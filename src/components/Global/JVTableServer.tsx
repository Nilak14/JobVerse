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

import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { TablePagination } from "./PaginationTable";
interface JVTableServerProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showPagination?: boolean;
  searchColumn?: string;
  searchPlaceholder?: string;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}
const JVTableServer = <TData, TValue>({
  columns,
  data,
  showPagination = true,
  searchColumn,
  searchPlaceholder = "Search",
  pagination,
  setPagination,
}: JVTableServerProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
    rowCount: data.length,
    manualPagination: true,
    initialState: {
      pagination,
    },

    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        {/* {searchColumn && (
          <Input
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )} */}
      </div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {/* <TableHead className="bg-primary text-white w-24 pl-4 ">
                  <p>SN</p>
                </TableHead> */}
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
                  {/* <TableCell className="pl-4">{row.index + 1}</TableCell> */}
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
                  colSpan={columns.length}
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
  );
};
export default JVTableServer;
