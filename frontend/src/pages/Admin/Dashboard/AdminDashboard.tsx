import { useEffect, useState } from "react";
import { AddVenueCard } from "./AddVenueCard";
import { getAllSchedules, getAllVenues } from "@/api/admin";
import type { AllVenues, GroupedAllSchedules } from "@/api/types";
import { toast } from "sonner";
import { VenueTable } from "./VenueTable";
import ScheduleTable from "./ScheduleTable";

export default function AdminDashboard() {
  const [venues, setVenues] = useState<AllVenues[]>([]);
  const [schedules, setSchedules] = useState<GroupedAllSchedules[]>([]);
  const getAllSchedulesData = async () => {
    const response = await getAllSchedules();
    setSchedules(response.data);
  };
  const getAllVenuesData = async () => {
    try {
      const response = await getAllVenues();
      setVenues(response.data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    getAllVenuesData();
    getAllSchedulesData();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-15 p-10">
        <div>
          <VenueTable data={venues} />
        </div>
        <div>
          <ScheduleTable data={schedules} />
        </div>
        <div className="flex ">
          <AddVenueCard />
        </div>
      </div>
    </>
  );
}
