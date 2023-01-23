import Form from "@/components/Form";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import { createUser } from "@/external/createUser";
import { AxiosError, isAxiosError } from "axios";
import { Permission, User } from "common";
import Image from "next/image";
import Router from "next/router";
import { FormEventHandler, useCallback, useState } from "react";

export default function UsersCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [permission, setPermission] = useState(Permission.standard);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<AxiosError>();

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

      try {
        const createdUser = await createUser(user);
        alert(`User "${createdUser.name}" created. =)`);
        Router.push("/");
      } catch (err) {
        if (isAxiosError(err)) {
          setError(err);
        }
      }
    },
    [email, name, password, permission, phone]
  );

  if (error) {
    return (
      <Layout title="Error creating user =(">
        <Image
          src={`https://http.cat/${error.response?.status || 200}`}
          alt="gatin"
          width={750}
          height={600}
        />
      </Layout>
    );
  }

  return (
    <Layout title="Create a User">
      <div className="flex flex-col place-items-center place-content-center">
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
            placeholder="(01) 23456-7890"
            pattern="([0-9]{2}) [0-9]{5}-[0-9]{4}"
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
