import Form from "@/components/Form";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import { createUser } from "@/external/createUser";
import { Permission, User } from "common";
import { FormEventHandler, useCallback, useState } from "react";

export default function UsersCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [permission, setPermission] = useState(Permission.standard);
  const [password, setPassword] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      const user = {
        name,
        email,
        phone,
        permission,
        password,
      } satisfies User;

      for (const [key, value] of Object.entries(user)) {
        console.log(`${key}: ${value}`);
      }

      const createdUser = await createUser(user);

      alert(`User "${createdUser.name}" created. =)`);
    },
    [email, name, password, permission, phone]
  );

  return (
    <Layout>
      <div className="flex flex-col place-items-center place-content-center">
        <Title label="Create a User" />
        <Form onSubmit={onSubmit}>
          <Input
            required
            type="text"
            label="Name:"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            required
            type="email"
            label="Email:"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            required
            type="tel"
            label="Phone:"
            placeholder="Phone"
            pattern="\(\d{2}\) \d{5}-\d{4}"
            onChange={(e) => setPhone(e.target.value)}
          />
          <label className="flex w-full justify-between">
            Permission:
            <select
              required
              className="mx-4 px-1 border rounded w-full"
              onChange={(e) => setPermission(e.target.value as Permission)}
            >
              <option value={Permission.standard}>Standard</option>
              <option value={Permission.admin}>Administrator</option>
            </select>
          </label>
          <Input
            required
            type="password"
            label="Password:"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form>
      </div>
    </Layout>
  );
}
