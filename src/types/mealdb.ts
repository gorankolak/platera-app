export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;

  strCategory?: string | null;
  strArea?: string | null;
  strInstructions?: string | null;
  strYoutube?: string | null;

  [key: string]: unknown;
};

export type MealPreview = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type MealListResponse<T> = {
  meals: T[] | null;
};

export type AreaListResponse = {
  meals: Array<{
    strArea: string;
  }>;
};
