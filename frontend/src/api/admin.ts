import apiClient from "./apiClient";

import type {
  IBaseResponse,
  VenueCreationResponse,
  VenueFormData,
  StaffRetrivalFromAdmin,
  ScheduleResponse,
} from "../lib/types";
import type {
  AllVenues,
  GroupedAllSchedules,
  ScheduleRequestProps,
} from "./types";

export async function createVenue(data: VenueFormData) {
  const response = await apiClient.post<IBaseResponse<VenueCreationResponse>>(
    "/api/admin/venue",
    data,
  );
  return response.data;
}

export async function getVenues() {
  const response =
    await apiClient.get<IBaseResponse<{ name: string; id: string }[]>>(
      "/api/admin/venue",
    );

  return response.data;
}

export async function getStaffs({
  date,
  fromTime,
  toTime,
}: {
  date: string;
  fromTime: string;
  toTime: string;
}) {
  const response = await apiClient.get<IBaseResponse<StaffRetrivalFromAdmin[]>>(
    "/api/admin/staffs",
    {
      params: {
        date,
        fromTime,
        toTime,
      },
    },
  );

  return response.data;
}

export async function scheduleTask(data: ScheduleRequestProps) {
  const response = await apiClient.post<IBaseResponse<ScheduleResponse>>(
    "/api/admin/schedule",
    data,
  );

  return response.data;
}

export async function getAllVenues() {
  const response =
    await apiClient.get<IBaseResponse<AllVenues[]>>("/api/admin/venues");
  return response.data;
}

export async function getAllSchedules() {
  const response = await apiClient.get<IBaseResponse<GroupedAllSchedules[]>>(
    "/api/admin/schedules",
  );
  return response.data;
}
