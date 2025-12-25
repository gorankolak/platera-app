import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "./Button";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const city = input.trim();

    if (!city) return;

    navigate(`/search/${encodeURIComponent(city.toLowerCase())}`);
    setInput("");
  };

  return (
    // styling in progress
    <div className="mx-auto mb-12 p-4 sm:max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center gap-2"
      >
        <SearchIcon className="text-mediumgray absolute left-4 h-5 w-5" />
        <input
          type="text"
          placeholder="Enter city name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-mediumgray focus:ring-primary/20 block w-full rounded-2xl border-none bg-white py-4 pr-4 pl-12 shadow-sm placeholder:text-gray-400 focus:ring-2"
        />

        <Button type="submit" variant="dark">
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
