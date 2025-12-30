import type { ReactNode } from "react";
import { FavoritesContext } from "./FavoritesContext";
import { useFavorites } from "../hooks/useFavorites";

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
