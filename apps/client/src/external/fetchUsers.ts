import { User } from "common";
import { api } from "./api";

interface UserWithId extends User {
  _id: string;
}

export async function fetchUsers() {
  const { data } = await api.get<UserWithId[]>("/users");

  return data;
}

export async function getUserById(id: string) {
  const { data } = await api.get<UserWithId>(`/users/${id}`);

  return data;
}
