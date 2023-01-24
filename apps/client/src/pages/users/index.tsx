import Card from "@/components/Card";
import CardList from "@/components/CardList";
import { Cog6ToothOutline } from "@/components/icons/Cog";
import Layout from "@/components/Layout";
import UserInfo from "@/components/UserInfo";
import { withAuthenticationRequired } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { fetchUsers } from "../../external/fetchUsers";

function UsersIndex() {
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return (
      <Cog6ToothOutline className="max-w-xs animate-[spin_3s_linear_infinite]" />
    );
  }

  if (isError) {
    throw error;
  }

  return (
    <Layout title="Users">
      <CardList>
        {...data.map(({ _id, email, name, phone, permission }) => (
          <Card
            key={_id}
            title={name}
            onClick={() => router.push(`/users/${_id}/edit`)}
          >
            <UserInfo
              email={email}
              name={name}
              phone={phone}
              permission={permission}
            />
          </Card>
        ))}
      </CardList>
    </Layout>
  );
}

export default withAuthenticationRequired(UsersIndex, { returnTo: "/login" });
