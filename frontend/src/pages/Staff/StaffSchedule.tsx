import { getUserSchedules } from "@/api/admin";
import type { ScheduleResponse } from "@/lib/types";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
const StaffSchedulesPage = () => {
  const [schedules, setSchedules] = useState<ScheduleResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const response = await getUserSchedules();
    setSchedules(response.data);
    setLoading(false);
  };
  useEffect(() => {
    getData();
    // Replace with real API call
  }, []);

  const groupedByDate = schedules.reduce(
    (acc, schedule) => {
      const date = new Date(schedule.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!acc[date]) acc[date] = [];
      acc[date].push(schedule);
      return acc;
    },
    {} as Record<string, ScheduleResponse[]>,
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">
        Your Scheduled Duties
      </h1>

      {loading ? (
        <div className="text-gray-400 text-center">Loading schedules...</div>
      ) : schedules.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          No schedules assigned yet.
        </div>
      ) : (
        Object.entries(groupedByDate).map(([date, daySchedules]) => (
          <div key={date} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">{date}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {daySchedules.map((schedule) => (
                <Card className="bg-background border border-border shadow-2xl shadow-gray-800">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-base font-semibold text-white">
                      {schedule.scheduleName}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {new Date(schedule.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(schedule.endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      | {schedule.venue}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      Duty assigned at{" "}
                      <span className="font-medium">{schedule.venue}</span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StaffSchedulesPage;
