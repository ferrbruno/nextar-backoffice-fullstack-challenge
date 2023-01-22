/* eslint-disable react-hooks/exhaustive-deps */
import { getUserProfile } from "@/external/profile";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useMemo, useReducer } from "react";
import { AuthContext } from "./authContext";
import { AuthState, initialAuthState } from "./authState";
import { reducer } from "./reducer";

interface AuthPoviderProps {
  children?: React.ReactNode;
  returnTo?: string;
}

export function AuthProvider({ returnTo, children }: AuthPoviderProps) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const {
    data: user,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(["auth", "profile"], getUserProfile);

  const contextValue = useMemo<AuthState>(() => {
    return {
      ...state,
      isLoading,
      isAuthenticated: isSuccess,
      error: error as Error,
    };
  }, [error, isLoading, isSuccess, state]);

  useEffect(() => {
    if (isSuccess && user) {
      dispatch({ type: "GET_ACCESS_TOKEN_COMPLETE", user });
    }
  }, [isSuccess, returnTo, user]);

  useEffect(() => {
    if (isError && returnTo) {
      dispatch({ type: "ERROR", error: error as Error });

      router.push(returnTo);
    }
  }, [error, isError, returnTo]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
