import Card from "@/components/Card";
import CardList from "@/components/CardList";
import { Cog6ToothOutline } from "@/components/icons/Cog";
import Layout from "@/components/Layout";
import UserInfo from "@/components/UserInfo";
import { withAuthenticationRequired } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { User } from "common";
import { fetchUsers } from "../../external/fetchUsers";

function UsersIndex() {
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
    <Layout>
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
    </Layout>
  );
}

export default withAuthenticationRequired(UsersIndex, { returnTo: "/login" });
