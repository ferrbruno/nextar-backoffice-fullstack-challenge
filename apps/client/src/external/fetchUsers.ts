import { User } from "common";
import { api } from "./api";

interface UserWithId extends User {
  _id: string;
}

export async function fetchUsers() {
  const { data } = await api.get<UserWithId[]>("/users");

  return data;
}

export async function getUserById(id: string): Promise<User> {
  const { data } = await api.get<User>(`/users/${id}`);

  return data;
}
