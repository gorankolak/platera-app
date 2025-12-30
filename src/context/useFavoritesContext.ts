import { useContext } from "react";
import { FavoritesContext } from "./FavoritesContext";
import type { FavoritesContextValue } from "./FavoritesContext";

export function useFavoritesContext(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error(
      "useFavoritesContext must be used inside FavoritesProvider",
    );
  }

  return ctx;
}
