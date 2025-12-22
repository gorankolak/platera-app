import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const city = input.trim();

    if (city === 0) return;

    navigate(`/search/${encodeURIComponent(city.toLowerCase())}`);
    setInput("");
  };

  return (
    // styling in progress
    <div className="sm:max-w-xl mb-12 mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 relative items-center"
      >
        <SearchIcon className="absolute left-4 w-5 h-5 text-mediumgray" />
        <input
          type="text"
          placeholder="Enter city name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="block w-full pl-12 pr-4 py-4 rounded-2xl border-none bg-white text-mediumgray placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20 shadow-sm"
        />

        <button
          type="submit"
          className="bg-darkgray text-white px-4 py-4 rounded-2xl cursor-pointer transition hover:opacity-90 active:scale-[0.98]"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
