import { AllSchedules, GroupedAllSchedules } from "../Types/Types";

export function converFromTimeToDate(baseDate: Date, time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // local date
}
export function groupSchedules(
  schedules: AllSchedules[],
): GroupedAllSchedules[] {
  const map = new Map<string, GroupedAllSchedules>();

  for (const schedule of schedules) {
    const key = `${schedule.date}-${schedule.startTime}-${schedule.endTime}-${schedule.venue.venueName}`;

    if (!map.has(key)) {
      const value = {
        scheduleName: schedule.scheduleName,
        date: schedule.date,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        venue: schedule.venue.venueName,
        user: [],
      };
      map.set(key, value);
    }

    const value = map.get(key);
    value!.user.push(schedule.user);
  }
  return Array.from(map.values());
}
