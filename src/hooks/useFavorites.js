import { useState, useEffect, useMemo } from "react";

const STORAGE_KEY = "platera-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const favoriteIds = useMemo(() => {
    return new Set(favorites.map((dish) => dish.idMeal));
  }, [favorites]);

  const addFavorite = (dish) => {
    if (!dish?.idMeal) return;

    setFavorites((prev) => {
      if (favoriteIds.has(dish.idMeal)) return prev;
      return [...prev, dish];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((d) => d.idMeal !== id));
  };

  const isFavorite = (id) => {
    return favoriteIds.has(id);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
