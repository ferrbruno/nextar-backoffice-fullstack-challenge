import Link from "next/link";
import Button from "../Button";
import NavBar from "../NavBar";
import SearchInput from "../SearchInput";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar>
        <Link href="/">
          <Button>Home</Button>
        </Link>
        <SearchInput onSearch={console.log} />
        <Button>Botãozinho</Button>
      </NavBar>
      {children}
    </>
  );
}
