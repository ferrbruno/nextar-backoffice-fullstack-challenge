import axios from "axios";
import { User } from "common";
import { apiUrl } from "./baseUrl";

export function createUser(user: User) {
  return axios.post(`${apiUrl}/users`, user);
}