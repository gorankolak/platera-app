import { createContext, type ReactNode } from "react";
import { useFavorites } from "../hooks/useFavorites";
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

type FavoritesProviderProps = {
  children: ReactNode;
};

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const favorites = useFavorites();

  return (
    <FavoritesContext.Provider value={favorites}>
      {children}
    </FavoritesContext.Provider>
  );
}
