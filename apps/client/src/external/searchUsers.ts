import { User } from "common";
import { api } from "./api";

interface UserWithId extends User {
  _id: string;
}

interface SearchUserDto extends Partial<Omit<User, "password">> {}

export async function searchUsers(filter: SearchUserDto) {
  const { data } = await api.post<UserWithId[]>("/users/search", filter);

  return data;
}
