import { useAuth } from "@/hooks/useAuth";
import { ComponentType } from "react";
import { AuthContextInterface } from "./authContext";

const defaultOnRedirecting = (): JSX.Element => <></>;

interface WithAuthenticationRequiredOptions {
  returnTo?: string | (() => string);
  onRedirecting?: () => JSX.Element;
  context?: React.Context<AuthContextInterface>;
}

export const withAuthenticationRequired = <P extends object>(
  Component: ComponentType<P>,
  options: WithAuthenticationRequiredOptions = {}
) => {
  const { onRedirecting = defaultOnRedirecting } = options;

  return function WithAuthenticationRequired(props: P): JSX.Element {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Component {...props} /> : onRedirecting();
  };
};
