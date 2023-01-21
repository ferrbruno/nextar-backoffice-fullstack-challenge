import Form from "@/components/Form";
import Input from "@/components/Input";
import { login } from "@/external/login";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(async () => {
    const { status } = await login({ email, password });

    if (status === HttpStatusCode.Ok) {
      router.push("/");
    }
  }, [email, password, router]);

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    []
  );

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    []
  );

  return (
    <Form title="Login" onSubmit={onSubmit} submitLabel="Login">
      <Input
        type="email"
        placeholder="Email"
        onChange={onChangeEmail}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        onChange={onChangePassword}
        required
      />
    </Form>
  );
}
