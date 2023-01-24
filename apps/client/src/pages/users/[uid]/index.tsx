import Card from "@/components/Card";
import Layout from "@/components/Layout";
import UserInfo from "@/components/UserInfo";
import { getUserById } from "@/external/fetchUsers";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback } from "react";

export default function UserDetails() {
  const router = useRouter();
  const { uid } = router.query;

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["user", { id: uid }],
    queryFn: () => getUserById(String(uid)),
  });

  const editUser = useCallback(() => {
    if (data) {
      router.push(`/users/${data._id}/edit`);
    }
  }, [data, router]);

  if (isError) {
    throw error;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <Layout title={`${data.name}'s details`}>
      <Card title={data.name}>
        <UserInfo {...data} />
        <button onClick={editUser} className="btn-primary self-center">
          Edit
        </button>
      </Card>
    </Layout>
  );
}
