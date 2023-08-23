interface NavBarProps {
  children?: React.ReactNode;
}

export default function NavBar({ children }: NavBarProps) {
  return (
    <div className="flex flex-col static top-0 h-screen w-16 items-center bg-indigo-900 dark:bg-slate-900 shadow-xl">
      {children}
    </div>
  );
}
