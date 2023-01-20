import { Cog6ToothOutline } from "@/components/icons/Cog";
import { useQuery } from "@tanstack/react-query";
import { User } from "common";
import { fetchUsers } from "./fetchUsers";

export default function UsersIndex() {
  const { data, isLoading, isError, error } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return <Cog6ToothOutline className="max-w-xs animate-[spin_3s_linear_infinite]" />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex flex-col w-fit">
      <h1>Users</h1>
      {data.map(({ name, email }) => (
        <ul key={email} className="border rounded-md pd-2 m-1">
          <li>{name}</li>
          <li>{email}</li>
        </ul>
      ))}
    </div>
  );
}
