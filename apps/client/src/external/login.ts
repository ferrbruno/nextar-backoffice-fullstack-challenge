import { api } from "./api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export function login({ email, password }: LoginCredentials) {
  return api.post(
    "/auth/login",
    { email, password },
  );
}
