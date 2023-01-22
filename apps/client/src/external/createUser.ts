import { User } from "common";
import { api } from "./api";

export async function createUser(user: User) {
  const { data } = await api.post<User>("/users", user);

  return data;
}
