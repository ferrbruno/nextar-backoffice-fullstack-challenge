import { AuthUser } from "common";
import { AuthState } from "./authState";

type Action =
  | { type: "LOGIN_STARTED" }
  | {
      type:
        | "INITIALISED"
        | "LOGIN_COMPLETE"
        | "GET_ACCESS_TOKEN_COMPLETE"
        | "HANDLE_REDIRECT_COMPLETE";
      user?: AuthUser;
    }
  | { type: "LOGOUT" }
  | { type: "ERROR"; error: Error };

export const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN_STARTED":
      return {
        ...state,
        isLoading: true,
      };

    case "LOGIN_COMPLETE":

    case "INITIALISED":

    case "HANDLE_REDIRECT_COMPLETE":

    case "GET_ACCESS_TOKEN_COMPLETE":
      if (state.user === action.user) {
        return state;
      }

      return {
        ...state,
        isAuthenticated: Boolean(action.user),
        user: action.user,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };

    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
  }
};
