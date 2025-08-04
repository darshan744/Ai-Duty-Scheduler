import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Select, SelectContent } from "@/components/ui/select";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectGroup, SelectItem } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { getStaffs, getVenues, scheduleTask } from "@/api/admin";
import type { StaffRetrivalFromAdmin } from "@/lib/types";
import { toast } from "sonner";
import type { ScheduleRequestProps } from "@/api/types";

export default function Scheduler() {
  const [scheduleName, setScheduleName] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [venue, setVenue] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [venues, setVenues] = useState<{ name: string; id: string }[]>([]);
  const [staffList, setStaffList] = useState<StaffRetrivalFromAdmin[]>([]);

  useEffect(() => {
    if (date !== undefined && fromTime !== "" && toTime !== "") {
      const obj = { date: date.toISOString().split("T")[0], fromTime, toTime };
      retrieveStaffs(obj);
    }
  }, [date, fromTime, toTime]);

  const retrieveVenues = async () => {
    try {
      const response = await getVenues();
      setVenues(response.data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        setVenues([]);
      }
    }
  };
  const retrieveStaffs = async (timings: {
    date: string;
    fromTime: string;
    toTime: string;
  }) => {
    try {
      const response = await getStaffs(timings);
      setStaffList(response.data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        setStaffList([]);
      }
    }
  };
  useEffect(() => {
    retrieveVenues();
  }, []);

  const toggleStaff = (name: string) => {
    setSelectedStaff((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const handleSubmit = async () => {
    if (!date || !fromTime || !toTime || !venue || selectedStaff.length === 0) {
      alert("Please fill all fields");
      return;
    }

    const payload: ScheduleRequestProps = {
      scheduleName,
      date: date.toISOString().split("T")[0],
      startTime: fromTime,
      endTime: toTime,
      venue,
      users: selectedStaff,
    };
    if (fromTime === toTime) {
      toast.error("From time and To time is same");
      return;
    }
    // TODO: Replace with API call
    try {
      const response = await scheduleTask(payload);
      toast.success(response.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Schedule a Duty</CardTitle>
        <CardDescription>
          Assign a staff to a venue and time slot.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Venue + Date */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="scheduleName">Schedule Name</Label>
          <Input
            id="scheduleName"
            placeholder="Schedule Name"
            onChange={(e) => setScheduleName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Venue</Label>
            <Select onValueChange={(val) => setVenue(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Venue" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {venues.map((venue) => (
                    <SelectItem key={venue.id} value={venue.id}>
                      {venue.name}{" "}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/** Date  */}
          <div className="flex flex-col gap-1.5">
            <Label>Date</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(d) => {
                    setDate(d);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* From / To Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>From</Label>
            <Input
              type="time"
              step="60"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>To</Label>
            <Input
              type="time"
              step="60"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
            />
          </div>
        </div>

        {/* Staff Selection */}
        <div className="flex flex-col gap-1.5">
          <Label>Select Staff</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {staffList.length > 0 ? (
              staffList.map((staff) => (
                <div key={staff.regNo} className="flex items-center gap-2">
                  <Checkbox
                    id={staff.regNo}
                    checked={selectedStaff.includes(staff.regNo)}
                    onCheckedChange={() => toggleStaff(staff.regNo)}
                  />
                  <Label htmlFor={staff.name}>{staff.name}</Label>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Staff will appear here </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button className="w-full mt-4" onClick={handleSubmit}>
          Schedule Duty
        </Button>
      </CardContent>
    </Card>
  );
}
