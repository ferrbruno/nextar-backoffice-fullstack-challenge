import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useCallback } from "react";
import Button from "../Button";
import NavBar from "../NavBar";
import SearchInput from "../SearchInput";
import Title from "../Title";

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const { isAuthenticated, logout, user } = useAuth();

  const onLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <>
      <NavBar>
        <Link href="/">
          <Button>Home</Button>
        </Link>
        <SearchInput />
        {isAuthenticated ? (
          <>
            <h1>{user?.name}</h1>
            <Button onClick={onLogout}>Logout</Button>
          </>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </NavBar>
      {title && <Title label={title} />}
      <div className="container m-2 p-4 flex place-content-center place-items-center">
        {children}
      </div>
    </>
  );
}
