import { User } from "common";
import { api } from "./api";

export async function updateUser(id: string, user: Partial<User>) {
  const { data } = await api.patch<User>(`/users/${id}`, user);

  return data;
}
