import { FormEventHandler } from "react";
import Button from "../Button";
import Title from "../Title";

interface FormProps {
  title?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  children?: React.ReactNode;
  submitLabel?: string;
}

export default function Form({
  title,
  onSubmit,
  children,
  submitLabel,
}: FormProps) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault(); // Default while it's useful

    if (onSubmit) {
      onSubmit(event);
    }
  };

  return (
    <div className="flex flex-col place-items-center place-content-center">
      <form
        onSubmit={handleSubmit}
        className="p-4 m-8 border rounded-xl flex flex-col gap-2 place-content-evenly w-fit h-fit"
      >
        {title && <Title label={title} />}
        {children}
        <Button type="submit" className="btn-primary self-center">
          {submitLabel || "Submit"}
        </Button>
      </form>
    </div>
  );
}
