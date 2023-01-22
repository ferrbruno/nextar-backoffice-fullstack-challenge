import { fetchUsers } from "@/external/fetchUsers";
import { useQuery } from "@tanstack/react-query";
import { User } from "common";
import Card from "../Card";
import CardList from "../CardList";
import { Cog6ToothOutline } from "../icons/Cog";
import UserInfo from "../UserInfo";

interface UsersListProps extends User {}

export default function UsersList(props: UsersListProps) {
  const { data, isLoading, isError, error } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return (
      <Cog6ToothOutline className="max-w-xs animate-[spin_3s_linear_infinite]" />
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <CardList title="Users">
      {...data.map(({ email, name, phone }) => (
        <Card key={email} title={name}>
          <UserInfo
            email={email}
            name={name}
            phone={phone}
            permission="standard"
          />
        </Card>
      ))}
    </CardList>
  );
}
