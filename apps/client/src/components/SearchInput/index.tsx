import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { MagnifyingGlass } from "../icons/MagnifyingGlass";

interface SearchInputProps {
  onSearch?: (value: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [text, setText] = useState("");

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setText(event.target.value),
    []
  );

  useEffect(() => {
    if (onSearch) {
      onSearch(text);
    }
  }, [onSearch, text]);

  return (
    <div className="relative max-h-10 max-w-xl bg-white border border-black rounded-xl p-1 flex">
      <MagnifyingGlass className="w-6 text-indigo-800" />
      <input
        type="search"
        placeholder="Search"
        className="bg-inherit outline-0 sm:w-96"
        onChange={onChange}
      />
    </div>
  );
}
