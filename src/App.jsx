import { useState } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import DishPage from "./pages/DishPage";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search/:city" element={<SearchResults />} />
        <Route path="dish/:id" element={<DishPage />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
