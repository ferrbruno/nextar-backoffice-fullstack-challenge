import { AuthUser } from "common";

export interface AuthState {
  error?: Error;
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: AuthUser;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
};