import { InputHTMLAttributes } from "react";

interface InputProps
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "placeholder" | "onChange"
  > {
  label?: string;
}

export default function Input({
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: InputProps) {
  return (
    <label className="flex w-full justify-between">
      {label}
      <input
        className="mx-4 px-1 border rounded"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
}
