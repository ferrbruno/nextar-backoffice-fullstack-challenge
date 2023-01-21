import { api } from "./api";

export function getUserProfile() {
  return api.get("/auth/profile");
}
