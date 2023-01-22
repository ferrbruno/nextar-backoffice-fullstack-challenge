import { ComponentType } from "react";
import { AuthContext, AuthContextInterface } from "./authContext";

export interface WithAuthProps {
  auth: AuthContextInterface;
}

export const withAuth = <P extends WithAuthProps>(
  Component: ComponentType<P>,
  context = AuthContext
): ComponentType<Omit<P, keyof WithAuthProps>> => {
  return function WithAuth(props): JSX.Element {
    return (
      <context.Consumer>
        {(auth: AuthContextInterface): JSX.Element => (
          <Component {...(props as P)} auth={auth} />
        )}
      </context.Consumer>
    );
  };
};
