import { createContext } from "react";
import type { Meal } from "../types/mealdb";

export type FavoritesContextValue = {
  favorites: Meal[];
  addFavorite: (meal: Meal) => void;
  removeFavorite: (idMeal: string) => void;
  isFavorite: (idMeal: string) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);
