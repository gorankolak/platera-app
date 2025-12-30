import { useState, useEffect, useMemo } from "react";
import type { Meal } from "../types/mealdb";

const STORAGE_KEY = "platera-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Meal[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Meal[]) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const favoriteIds = useMemo(() => {
    return new Set(favorites.map((dish) => dish.idMeal));
  }, [favorites]);

  const addFavorite = (dish: Meal) => {
    setFavorites((prev) => {
      if (prev.some((d) => d.idMeal === dish.idMeal)) {
        return prev;
      }
      return [...prev, dish];
    });
  };

  const removeFavorite = (idMeal: string) => {
    setFavorites((prev) => prev.filter((d) => d.idMeal !== idMeal));
  };

  const isFavorite = (idMeal: string) => {
    return favoriteIds.has(idMeal);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
