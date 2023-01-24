import { searchUsers } from "@/external/searchUsers";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);

  const { data } = useQuery({
    queryKey: ["users", "search", { term: text }],
    queryFn: () => searchUsers({ name: text, email: text }),
    enabled: focused && Boolean(text),
    refetchOnWindowFocus: false,
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setText(event.target.value),
    []
  );

  const onFocus: FocusEventHandler<HTMLInputElement> = useCallback(() => {
    setFocused(true);
  }, []);

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
      {data?.length ? (
        <div className="absolute focus:visible z-10 top-9 right-0 origin-top-left flex flex-col bg-slate-100 border overflow-auto shadow-xl h-fit w-full max-w-96 max-h-96">
          {...data.map(({ _id, name }) => (
            <span
              key={_id}
              className="w-full border border-transparent hover:border-indigo-800 hover:bg-indigo-200"
              onClick={() => router.push(`/users/${_id}`)}
            >
              {name}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
