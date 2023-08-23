import { useAuth } from "@/hooks/useAuth";
import { useDarkMode } from "@/hooks/useDarkMode";
import Link from "next/link";
import { useCallback } from "react";
import ArrowLeftOnRectangleIcon from "../icons/ArrowLeftOnRectangle";
import ArrowRightOnRectangleIcon from "../icons/ArrowRightOnRectangle";
import HomeIcon from "../icons/Home";
import MoonIcon from "../icons/Moon";
import SunIcon from "../icons/Sun";
import { UserIcon, UsersIcon, UserPlusIcon } from "../icons/User";
import NavBar from "../NavBar";
import NavBarIcon from "../NavBarIcon";
import Title from "../Title";

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const { isAuthenticated, logout, user } = useAuth();
  const [enabled, setEnabled] = useDarkMode();

  const toggleDarkMode = useCallback(() => {
    setEnabled(!enabled);
  }, [enabled, setEnabled]);

  const handleLogout = useCallback(() => {
    logout({ returnTo: "/login" });
  }, [logout]);

  return (
    <div className="flex dark:bg-slate-800">
      <NavBar>
        <Link href="/">
          <NavBarIcon icon={<HomeIcon />} text="Home" />
        </Link>
        <Link href={`/users/${user?.userId}`}>
          <NavBarIcon icon={<UserIcon />} text="Profile" />
        </Link>
        <Link href="/users">
          <NavBarIcon icon={<UsersIcon />} text="Users" />
        </Link>
        <Link href="/users/create">
          <NavBarIcon icon={<UserPlusIcon />} text="Add User" />
        </Link>
        <NavBarIcon
          icon={enabled ? <SunIcon /> : <MoonIcon />}
          text={`Switch to ${enabled ? "Light" : "Dark"} Mode`}
          onClick={toggleDarkMode}
        />
        {isAuthenticated ? (
          <NavBarIcon
            icon={<ArrowLeftOnRectangleIcon />}
            text="Logout"
            onClick={handleLogout}
          />
        ) : (
          <Link href="/login">
            <NavBarIcon icon={<ArrowRightOnRectangleIcon />} text="Login" />
          </Link>
        )}
      </NavBar>
      <div className="flex flex-col w-full h-full">
        {title && <Title label={title} />}
        <div className="flex m-2 p-4 place-content-center">{children}</div>
      </div>
    </div>
  );
}
