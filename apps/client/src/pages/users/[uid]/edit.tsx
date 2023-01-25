import { Cog6ToothOutline } from "@/components/icons/Cog";
import Layout from "@/components/Layout";
import { updateUser } from "@/external/updateUser";
import { getUserById } from "@/external/fetchUsers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Permission, User } from "common";
import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react";
import Form from "@/components/Form";
import Input from "@/components/Input";

export default function UserEdit() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [permission, setPermission] = useState<Permission>(Permission.standard);
  const [password, setPassword] = useState<string>();

  const router = useRouter();
  const { uid } = router.query;

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["user", { id: uid }],
    queryFn: () => getUserById(String(uid)),
    enabled: Boolean(uid),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user: Partial<User>) => updateUser(String(uid), user),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["users"]);
      queryClient.setQueryData(["user", { id: uid }], data);
    },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(async () => {
    const user = {
      name,
      email,
      phone,
      permission,
      password,
    } satisfies Partial<User>;

    for (const [key, value] of Object.entries(user)) {
      if (!value) {
        delete user[key as keyof typeof user];
      }
    }

    const updatedUser = await mutation.mutateAsync(user);

    alert(`Updated user ${updatedUser.name}!`);

    router.push({
      pathname: "/users/[uid]",
      query: { uid: updatedUser._id },
    });
  }, [email, mutation, name, password, permission, phone, router]);

  const onChangeName: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setName(e.target.value),
    []
  );

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setEmail(e.target.value),
    []
  );

  const onChangePhone: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setPhone(e.target.value),
    []
  );

  const onChangePermission: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => setPermission(e.target.value as Permission),
    []
  );

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setPassword(e.target.value),
    []
  );

  if (isError) {
    throw error;
  }

  if (isLoading) {
    return (
      <Cog6ToothOutline className="max-w-xs animate-[spin_3s_linear_infinite]" />
    );
  }

  return (
    <Layout title={`Editing ${data.name}`}>
      <Form title={`Update ${data.name}'s info`} onSubmit={onSubmit}>
        <Input
          type="text"
          label="Name:"
          placeholder={data.name}
          onChange={onChangeName}
        />
        <Input
          type="email"
          label="Email:"
          placeholder={data.email}
          onChange={onChangeEmail}
        />
        <Input
          type="tel"
          label="Phone:"
          placeholder={data.phone}
          onChange={onChangePhone}
        />
        <label className="flex w-full justify-between">
          Permission:
          <select
            className="mx-4 px-1 border rounded w-full"
            defaultValue={data.permission}
            onChange={onChangePermission}
          >
            <option value={Permission.admin}>Administrator</option>
            <option value={Permission.standard}>Standard</option>
          </select>
        </label>
        <Input
          type="password"
          label="Password:"
          placeholder="Enter new password..."
          onChange={onChangePassword}
        />
      </Form>
    </Layout>
  );
}
