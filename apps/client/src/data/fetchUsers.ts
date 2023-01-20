import axios from "axios";
import { User } from "common";
import { apiUrl } from "./baseUrl";

export async function fetchUsers(): Promise<User[]> {
  const { data } = await axios.get<User[]>(`${apiUrl}/users`);

  return data;
}
