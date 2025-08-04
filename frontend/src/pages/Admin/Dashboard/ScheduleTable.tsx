import type { GroupedAllSchedules } from "@/api/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
type ScheduleTableProps = {
  data: GroupedAllSchedules[];
};
export default function ScheduleTable({ data }: ScheduleTableProps) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Schedule Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Users</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.scheduleName}</TableCell>
              <TableCell>
                {new Date(item.date).toISOString().split("T")[0]}
              </TableCell>
              <TableCell>
                {new Date(item.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell>
                {new Date(item.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell>{item.venue}</TableCell>
              <TableCell>
                <ul className="text-sm space-y-1">
                  {item.user.map((u, i) => (
                    <li key={i}>
                      {u.name} ({u.regNo})
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
