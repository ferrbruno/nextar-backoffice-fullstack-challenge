import { searchUsers } from "@/external/searchUsers";
import { useQuery } from "@tanstack/react-query";
import {
  ChangeEventHandler,
  FocusEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { MagnifyingGlass } from "../icons/MagnifyingGlass";

interface SearchInputProps {
  onSearch?: (value: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);

  const { data } = useQuery({
    queryKey: ["users", "search", { name: text }],
    queryFn: () => searchUsers({ name: text }),
    enabled: focused && Boolean(text),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setText(event.target.value);
    },
    []
  );

  const onFocus: FocusEventHandler<HTMLInputElement> = useCallback(() => {
    setFocused(true);
    if (data) {
      console.log({ data });
    }
  }, [data]);

  const onBlur: FocusEventHandler<HTMLInputElement> = useCallback(() => {
    setFocused(false);
  }, []);

  useEffect(() => {
    if (onSearch) {
      onSearch(text);
    }
  }, [onSearch, text]);

  return (
    <div className="relative bg-white border border-black rounded-xl p-1 flex">
      <MagnifyingGlass className="w-6 text-indigo-800" />
      <input
        type="search"
        placeholder="Search"
        className="bg-inherit outline-0 sm:w-96"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}
