import axios from "axios";
import type { LoginResponse, SignUpProps, SignUpResponse } from "./types";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const loginUrl = import.meta.env.VITE_API_URL + "/auth/login";

  const response = await axios.post<LoginResponse>(loginUrl, {
    email,
    password,
  });
  return response.data;
}

export async function signUp(user: SignUpProps) {
  const signUpUrl = import.meta.env.VITE_API_URL + "/auth/signUp";

  const response = await axios.post<SignUpResponse>(signUpUrl, user);

  return response;
}
