import { User } from "common";
import { api } from "./api";

export async function fetchUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/users");

  return data;
}
