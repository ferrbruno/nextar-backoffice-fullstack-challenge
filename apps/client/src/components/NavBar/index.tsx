interface NavBarProps {
  children?: React.ReactNode;
}

export default function NavBar({ children }: NavBarProps) {
  return (
    <div className="w-full h-fit p-2 bg-indigo-600 flex justify-between content-center items-center">
      {children}
    </div>
  );
}
