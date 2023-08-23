import { LoginCredentials, login } from "@/external/login";
import { logout } from "@/external/logout";
import { getUserProfile } from "@/external/profile";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, HttpStatusCode } from "axios";
import { useRouter } from "next/router";
import { useReducer, useCallback, useMemo, useEffect } from "react";
import {
  AuthContext,
  AuthContextInterface,
  LoginOptions,
  LogoutOptions,
} from "./authContext";
import { initialAuthState } from "./authState";
import { reducer } from "./reducer";

interface AuthPoviderProps {
  children?: React.ReactNode;
  returnTo?: string;
}

export function AuthProvider({ returnTo, children }: AuthPoviderProps) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const { isLoading, refetch } = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: getUserProfile,
    retry(failureCount, error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          return false;
        }
      }

      return failureCount < 5;
    },
    onSuccess(user) {
      if (user) {
        dispatch({ type: "GET_ACCESS_TOKEN_COMPLETE", user });
      }
    },
    onError(err) {
      dispatch({ type: "ERROR", error: err as Error });
    },
  });

  useEffect(() => {
    if (isLoading) {
      dispatch({ type: "LOGIN_STARTED" });
    }
  }, [isLoading]);

  const handleLogin = useCallback(
    async (credentials: LoginCredentials, { redirectTo }: LoginOptions) => {
      dispatch({ type: "LOGIN_STARTED" });

      try {
        await login(credentials);

        // Refetch to get user by the access_token
        await refetch();

        if (redirectTo) {
          router.push(redirectTo);
        }
      } catch (err) {
        dispatch({ type: "ERROR", error: err as Error });
      }
    },
    [refetch, router]
  );

  const handleLogout = useCallback(
    async (options?: LogoutOptions) => {
      await logout();

      dispatch({ type: "LOGOUT" });

      const returnUrl = options?.returnTo ?? returnTo;

      returnUrl ? router.push(returnUrl) : router.reload();
    },
    [returnTo, router]
  );

  const contextValue = useMemo<AuthContextInterface>(() => {
    return {
      ...state,
      login: handleLogin,
      logout: handleLogout,
    };
  }, [handleLogin, handleLogout, state]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
