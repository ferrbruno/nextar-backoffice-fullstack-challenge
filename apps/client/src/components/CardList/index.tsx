interface CardListProps {
  title?: string,
  children?: React.ReactNode
}

export default function CardList({ title, children }: CardListProps) {
  return (
    <div>
      {title && <h1>{title}</h1>}
      <div className="grid gap-4 grid-cols-4 justify-around p-4">
        {children}
      </div>
    </div>
  );
}