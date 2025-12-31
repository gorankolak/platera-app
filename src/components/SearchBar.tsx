import { Search as SearchIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import type { FormEvent, ChangeEvent } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const city = input.trim();

    if (!city) {
      inputRef.current?.focus();
      return;
    }

    navigate(`/search/${encodeURIComponent(city.toLowerCase())}`);
    setInput("");
  };

  const handleIconClick = () => {
    if (!input.trim()) {
      inputRef.current?.focus();
      return;
    }

    navigate(`/search/${encodeURIComponent(input.toLowerCase())}`);
    setInput("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="mx-auto mb-12 p-4 sm:max-w-xl">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <button
          type="button"
          onClick={handleIconClick}
          aria-label="Search"
          className="bg-darkgray absolute left-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white transition hover:opacity-90 active:scale-95"
        >
          <SearchIcon className="h-5 w-5" />
        </button>

        <input
          ref={inputRef}
          type="text"
          placeholder="Enter city name…"
          value={input}
          minLength={2}
          onChange={handleChange}
          className="text-mediumgray focus:ring-primary/20 block w-full rounded-2xl bg-white py-4 pr-4 pl-16 shadow-sm placeholder:text-gray-400 focus:ring-2"
        />
      </form>
    </div>
  );
};

export default SearchBar;
