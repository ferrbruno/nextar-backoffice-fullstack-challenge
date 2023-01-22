import Form from "@/components/Form";
import Input from "@/components/Input";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(() => {
    login({ email, password }, { redirectTo: "/" });
  }, [email, login, password]);

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

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

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
