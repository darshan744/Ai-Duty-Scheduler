import type { EditableInputs, IBaseResponse, IUser } from "@/lib/types";
import apiClient from "./apiClient";

export async function getUserData() {
  const response = await apiClient.get<IBaseResponse<IUser>>(
    "/api/staff/profile",
    {
      withCredentials: true,
    },
  );

  return response.data;
}

export async function patchUserData(data: EditableInputs) {
  const patchUrl = "/api/staff/profile";

  const response = await apiClient.patch<IBaseResponse<EditableInputs>>(
    patchUrl,
    data,
  );

  return response.data;
}
