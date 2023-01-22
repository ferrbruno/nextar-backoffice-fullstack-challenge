import { createContext } from "react";
import { AuthState, initialAuthState } from "./authState";

export interface LoginOptions {
  redirectTo?: string;
}

export interface LogoutOptions {
  returnTo: string;
}

export interface AuthContextInterface extends AuthState {}

export const AuthContext = createContext<AuthContextInterface>(initialAuthState);
