import Title from "@/components/Title";
import { createUser } from "@/external/createUser";
import { Permission, User } from "common";
import { FormEventHandler, useState } from "react";

export default function UsersCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [permission, setPermission] = useState(Permission.standard);
  const [password, setPassword] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
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

    await createUser(user);
  };

  return (
    <div className="flex flex-col place-items-center place-content-center">
      <Title label="Create a User" />
      <form
        onSubmit={onSubmit}
        className="p-4 m-8 border rounded-xl flex flex-col gap-2 place-content-evenly w-fit h-fit"
      >
        <label className="flex w-full justify-between">
          Name:
          <input
            type="text"
            placeholder="Name"
            className="mx-4 px-1 border rounded"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="flex w-full justify-between">
          Email:
          <input
            type="text"
            placeholder="Email"
            className="mx-4 px-1 border rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="flex w-full justify-between">
          Phone:
          <input
            type="text"
            placeholder="Phone"
            className="mx-4 px-1 border rounded"
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label className="flex w-full justify-between">
          Permission:
          <select
            className="mx-4 px-1 border rounded w-full"
            onChange={(e) => setPermission(e.target.value as Permission)}
          >
            <option value={Permission.standard}>Standard</option>
            <option value={Permission.admin}>Administrator</option>
          </select>
        </label>
        <label className="flex w-full justify-between">
          Password:
          <input
            type="password"
            placeholder="Password"
            className="mx-4 px-1 border rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input
          type="submit"
          value="Submit"
          className="btn-primary self-center"
        />
      </form>
    </div>
  );
}
