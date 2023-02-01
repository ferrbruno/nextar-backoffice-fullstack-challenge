import Card from "@/components/Card";
import CardList from "@/components/CardList";
import { Cog6ToothOutline } from "@/components/icons/Cog";
import Layout from "@/components/Layout";
import SearchInput from "@/components/SearchInput";
import UserInfo from "@/components/UserInfo";
import { withAuthenticationRequired } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { fetchUsers } from "../../external/fetchUsers";

function UsersIndex() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const onSearch = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const onClickUser = useCallback(
    (id: string) => () => {
      router.push(`/users/${id}`);
    },
    [router]
  );

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
      <div className="flex flex-col items-center">
        <SearchInput onSearch={onSearch} />
        <CardList>
          {data
            .filter(({ name, email }) => {
              if (!searchValue) {
                return true;
              }

              return name.includes(searchValue) || email.includes(searchValue);
            })
            .map(({ _id, email, name, phone, permission }) => (
              <Card key={_id} title={name} onClick={onClickUser(_id)}>
                <UserInfo
                  email={email}
                  name={name}
                  phone={phone}
                  permission={permission}
                />
              </Card>
            ))}
        </CardList>
      </div>
    </Layout>
  );
}

export default withAuthenticationRequired(UsersIndex, { returnTo: "/login" });
