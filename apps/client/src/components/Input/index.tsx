import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({
  label,
  onChange,
  placeholder,
  required,
  type = "text",
  value,
}: InputProps) {
  return (
    <label className="flex w-full justify-between dark:text-white">
      {label}
      <input
        className="mx-4 px-1 border rounded dark:bg-black"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </label>
  );
}
