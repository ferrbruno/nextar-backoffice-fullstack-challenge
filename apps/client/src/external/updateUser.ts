import { User } from "common";
import { api } from "./api";

interface UserWithId extends User {
  _id: string;
}

export async function updateUser(id: string, user: Partial<User>) {
  const { data } = await api.patch<UserWithId>(`/users/${id}`, user);

  return data;
}
