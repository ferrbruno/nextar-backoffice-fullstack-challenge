import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useCallback } from "react";
import Button from "../Button";
import NavBar from "../NavBar";
import SearchInput from "../SearchInput";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, logout } = useAuth();

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
          <Button onClick={onLogout}>Logout</Button>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </NavBar>
      {children}
    </>
  );
}
