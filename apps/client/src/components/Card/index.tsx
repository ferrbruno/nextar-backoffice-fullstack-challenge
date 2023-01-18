import { Inter } from "@next/font/google";

interface CardProps {
  title: string;
  children?: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export default function Card({ title, children }: CardProps) {
  return (
    <div className="hover:bg-slate-200 transition-transform duration-500 hover:scale-110 py-8 px-8 max-w-md mx-auto rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <h1 className={inter.className}>{title}</h1>
      {children}
    </div>
  );
}
