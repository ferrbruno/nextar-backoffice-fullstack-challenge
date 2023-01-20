interface CardProps {
  title: string;
  children?: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="border flex flex-col hover:bg-slate-200 transition-transform duration-500 hover:scale-110 p-8 w-96 max-w-md mx-auto rounded-xl shadow-xl space-y-2 sm:py-4 sm:space-y-0 sm:space-x-6">
      <h1 className="py-2 text-xl text-center whitespace-nowrap">{title}</h1>
      {children}
    </div>
  );
}
