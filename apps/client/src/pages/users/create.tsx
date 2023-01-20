import { Permission } from "common";
import { FormEventHandler, useState } from "react";

export default function UsersCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [permission, setPermission] = useState(Permission.standard);
  const [password, setPassword] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const userForm = new FormData();

    userForm.set("name", name);
    userForm.set("email", email);
    userForm.set("phone", phone);
    userForm.set("permission", permission);
    userForm.set("password", password);

    for (const [key, value] of userForm.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  return (
    <div className="flex flex-col place-items-center">
      <h1 className="p-8 text-xl w-full text-start bg-gradient-to-r from-indigo-300 to-indigo-800">
        Create a User
      </h1>
      <form
        onSubmit={onSubmit}
        className="p-4 m-8 border rounded-xl flex flex-col place-content-evenly w-fit h-fit"
      >
        <label className="m-2 px-1">
          Name:
          <input
            type="text"
            placeholder="Name"
            className="mx-4 px-1 border rounded"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="m-2 px-1">
          Email:
          <input
            type="text"
            placeholder="Email"
            className="mx-4 px-1 border rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="m-2 px-1">
          Phone:
          <input
            type="text"
            placeholder="Phone"
            className="mx-4 px-1 border rounded"
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label className="m-2 px-1">
          Permission:
          <select
            className="mx-4 px-1 border rounded"
            onChange={(e) => setPermission(e.target.value as Permission)}
          >
            <option value={Permission.standard}>Standard</option>
            <option value={Permission.admin}>Administrator</option>
          </select>
        </label>
        <label className="m-2 px-1">
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
          className="mx-4 px-1 border rounded"
        />
      </form>
    </div>
  );
}
