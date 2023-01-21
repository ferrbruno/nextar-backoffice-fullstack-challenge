import { api } from "./api";

interface LoginCredentials {
  email: string;
  password: string;
}

export function login({ email, password }: LoginCredentials) {
  return api.post(
    "/auth/login",
    { email, password },
  );
}
