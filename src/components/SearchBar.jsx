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
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Enter city name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-black text-white px-2 py-2 rounded"
      />

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
