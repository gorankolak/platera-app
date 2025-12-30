import Fuse from "fuse.js";
import type {
  Meal,
  MealPreview,
  MealListResponse,
  AreaListResponse,
} from "../types/mealdb";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchAvailableAreas = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}/list.php?a=list`);
  if (!res.ok) throw new Error("Failed to fetch areas");

  const data = (await res.json()) as AreaListResponse;

  return data.meals.map((a) => a.strArea);
};

export const matchCountryToArea = async (
  country: string,
): Promise<string | null> => {
  const areas = await fetchAvailableAreas();

  const fuse = new Fuse(areas, {
    includeScore: true,
    threshold: 0.4,
  });

  const result = fuse.search(country);
  return result[0]?.item ?? null;
};

export const fetchMealsByArea = async (
  area: string,
): Promise<MealPreview[]> => {
  const res = await fetch(
    `${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`,
  );
  if (!res.ok) throw new Error("Failed to fetch meals by area");

  const data = (await res.json()) as MealListResponse<MealPreview>;
  return data.meals ?? [];
};

export const fetchDishById = async (id: string): Promise<Meal | null> => {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error("Failed to fetch dish");

  const data = (await res.json()) as MealListResponse<Meal>;
  return data.meals?.[0] ?? null;
};
