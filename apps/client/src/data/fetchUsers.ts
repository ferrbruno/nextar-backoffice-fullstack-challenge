import axios from "axios";
import { User } from "common";

export async function fetchUsers(): Promise<User[]> {
  const { data } = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");

  return data;
}
