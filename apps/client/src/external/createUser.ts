import { User } from "common";
import { api } from "./api";

export function createUser(user: User) {
  return api.post("/users", user);
}