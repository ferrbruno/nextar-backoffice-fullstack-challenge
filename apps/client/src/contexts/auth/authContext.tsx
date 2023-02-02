import { LoginCredentials } from "@/external/login";
import { createContext } from "react";
import { AuthState, initialAuthState } from "./authState";

export interface LoginOptions {
  redirectTo: string;
}

export interface LogoutOptions {
  returnTo: string;
}

export interface AuthContextInterface extends AuthState {
  login: (credentials: LoginCredentials, options: LoginOptions) => void | Promise<void>
  logout: (options?: LogoutOptions) => void | Promise<void>
}

const stub = (): never => {
  throw new Error('You forgot to wrap your component in <AuthProvider>.');
};

export const initialContext = {
  ...initialAuthState,
  login: stub,
  logout: stub,
};

export const AuthContext = createContext<AuthContextInterface>(initialContext);
