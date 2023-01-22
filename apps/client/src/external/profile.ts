import { AuthUser } from "common";
import { api } from "./api";

export async function getUserProfile() {
  const { data } = await api.get<AuthUser>("/auth/profile");

  return data;
}
