import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="p-2 bg-slate-400 border border-black rounded-md hover:brightness-150"
    />
  );
}
