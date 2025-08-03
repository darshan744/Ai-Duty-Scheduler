import axios from "axios";
import type { LoginResponse } from "./types";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const loginUrl = import.meta.env.VITE_API_URL + "/login";

  const response = await axios.post<LoginResponse>(loginUrl, {
    email,
    password,
  });
  return response.data;
}
