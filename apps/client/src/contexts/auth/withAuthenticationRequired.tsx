import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";
import { AuthContextInterface } from "./authContext";

const defaultOnRedirecting = (): JSX.Element => <>Redirecting...</>;

const defaultReturnTo = (): string =>
  `${location.pathname}${location.search}`;

interface WithAuthenticationRequiredOptions {
  returnTo?: string | (() => string);
  onRedirecting?: () => JSX.Element;
  context?: React.Context<AuthContextInterface>;
}

export const withAuthenticationRequired = <P extends object>(
  Component: ComponentType<P>,
  options: WithAuthenticationRequiredOptions = {}
) => {
  const { onRedirecting = defaultOnRedirecting, returnTo = defaultReturnTo } =
    options;

  return function WithAuthenticationRequired(props: P): JSX.Element {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
      if (isAuthenticated || isLoading) {
        return;
      }

      const opts = {
        returnTo: typeof returnTo === "function" ? returnTo() : returnTo,
      };

      router.replace(opts.returnTo);
    }, [isAuthenticated, isLoading, router]);

    return isAuthenticated ? <Component {...props} /> : onRedirecting();
  };
};
