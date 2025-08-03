import apiClient from "./apiClient";
import type { LoginResponse, SignUpProps, SignUpResponse } from "./types";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await apiClient.post<LoginResponse>(
    "/auth/login",
    {
      email,
      password,
    },
    { withCredentials: true },
  );
  return response.data;
}

export async function signUp(user: SignUpProps) {
  const response = await apiClient.post<SignUpResponse>("/auth/signUp", user, {
    withCredentials: true,
  });

  return response;
}
