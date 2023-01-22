import Card from "@/components/Card";
import CardList from "@/components/CardList";
import { Cog6ToothOutline } from "@/components/icons/Cog";
import UserInfo from "@/components/UserInfo";
import { useQuery } from "@tanstack/react-query";
import { User } from "common";
import { fetchUsers } from "../../external/fetchUsers";

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
