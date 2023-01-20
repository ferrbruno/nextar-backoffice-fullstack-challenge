interface TitleProps {
  label: string;
}

export default function Title({ label }: TitleProps) {
  return (
    <h1 className="p-8 text-xl w-full text-start bg-gradient-to-r from-indigo-300 to-indigo-800">
      {label}
    </h1>
  );
}
