import Form from "@/components/Form";
import Input from "@/components/Input";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(() => {
    console.log({ email, password });
  }, [email, password]);

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
      <Input type="email" placeholder="Email" onChange={onChangeEmail} />
      <Input
        type="password"
        placeholder="Password"
        onChange={onChangePassword}
      />
    </Form>
  );
}
