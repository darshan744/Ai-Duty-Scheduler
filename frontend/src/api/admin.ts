import apiClient from "./apiClient";

import type {
  IBaseResponse,
  VenueCreationResponse,
  VenueFormData,
  StaffRetrivalFromAdmin,
} from "../lib/types";

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

export async function getStaffs() {
  const response =
    await apiClient.get<IBaseResponse<StaffRetrivalFromAdmin[]>>(
      "/api/admin/staffs",
    );

  return response.data;
}
