// components/VenueTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

interface IVenue {
  venueName: string;
  location: string;
  capacity: number;
  type?: "hall" | "lab" | "classroom" | "auditorium" | "other";
  isActive: boolean;
  facilities: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface VenueTableProps {
  data: IVenue[];
}

export const VenueTable: React.FC<VenueTableProps> = ({ data }) => {
  const columns: ColumnDef<IVenue>[] = [
    {
      accessorKey: "venueName",
      header: "Venue Name",
      cell: ({ row }) => <div>{row.original.venueName}</div>,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <div>{row.original.location}</div>,
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
      cell: ({ row }) => <div>{row.original.capacity}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div>{row.original.type ?? "N/A"}</div>,
    },
    {
      accessorKey: "isActive",
      header: "Active?",
      cell: ({ row }) =>
        row.original.isActive ? (
          <span className="text-green-600 font-medium">Yes</span>
        ) : (
          <span className="text-red-500 font-medium">No</span>
        ),
    },
    {
      accessorKey: "facilities",
      header: "Facilities",
      cell: ({ row }) => (
        <ul className="text-xs space-y-1">
          {row.original.facilities.map((f, i) => (
            <li key={i}>• {f}</li>
          ))}
        </ul>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
