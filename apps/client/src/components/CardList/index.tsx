interface CardListProps {
  title?: string,
  children?: React.ReactNode
}

export default function CardList({ title, children }: CardListProps) {
  return (
    <div>
      {title && <h1 className="text-xl text-center">{title}</h1>}
      <div className="w-full flex place-content-evenly flex-wrap gap-4 p-4">
        {children}
      </div>
    </div>
  );
}