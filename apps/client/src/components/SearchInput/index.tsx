import { ChangeEventHandler, useEffect, useState } from "react";
import { MagnifyingGlass } from "../icons/MagnifyingGlass";

interface SearchInputProps {
  onSearch?: (value: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [text, setText] = useState("");

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value);
  };

  // const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
  //   setText('');
  //   event.target.value = '';
  // }

  useEffect(() => {
    if (onSearch) {
      onSearch(text);
    }
  }, [onSearch, text]);

  return (
    <div className="bg-white border border-black rounded-xl p-1 flex">
      <MagnifyingGlass />
      <input
        type="text"
        placeholder="Search"
        className="bg-inherit outline-0 sm:w-96"
        onChange={onChange}
        // onBlur={onBlur}
      />
    </div>
  );
}
