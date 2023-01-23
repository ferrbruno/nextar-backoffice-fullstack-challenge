import { User } from "common";
import { api } from "./api";

interface SearchUserDto extends Partial<Omit<User, "password">> {}

export async function searchUsers(filter: SearchUserDto): Promise<User[]> {
  const { data } = await api.post<User[]>("/users/search", filter);

  return data;
}
