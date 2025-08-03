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
import { useState } from "react";
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
export default function Scheduler() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [venue, setVenue] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);

  const staffList = ["Darshan", "Aarya", "Rahul", "Sneha", "Tara"];

  const toggleStaff = (name: string) => {
    setSelectedStaff((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const handleSubmit = () => {
    if (!date || !fromTime || !toTime || !venue || selectedStaff.length === 0) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      scheduleName: "AI Scheduled Duty",
      date,
      startTime: fromTime,
      endTime: toTime,
      venue,
      users: selectedStaff,
    };

    console.log("Submitting schedule:", payload);
    // TODO: Replace with API call
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Venue</Label>
            <Select onValueChange={(val) => setVenue(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Venue" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Auditorium">Auditorium</SelectItem>
                  <SelectItem value="Lab 3">Lab 3</SelectItem>
                  <SelectItem value="Room 210">Room 210</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

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
              step="1"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>To</Label>
            <Input
              type="time"
              step="1"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
            />
          </div>
        </div>

        {/* Staff Selection */}
        <div className="flex flex-col gap-1.5">
          <Label>Select Staff</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {staffList.map((name) => (
              <div key={name} className="flex items-center gap-2">
                <Checkbox
                  id={name}
                  checked={selectedStaff.includes(name)}
                  onCheckedChange={() => toggleStaff(name)}
                />
                <Label htmlFor={name}>{name}</Label>
              </div>
            ))}
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
