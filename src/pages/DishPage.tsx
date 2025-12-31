import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Heart } from "lucide-react";

import { useFavoritesContext } from "../context/useFavoritesContext";
import { fetchDishById } from "../services/meals";
import type { Meal } from "../types/mealdb";
import Button from "../components/Button";
import DishPageSkeleton from "../components/DishPageSkeleton";

type IngredientItem = {
  ingredient: string;
  measure?: string;
};

const getIngredientList = (dish: Meal): IngredientItem[] => {
  const ingredients: IngredientItem[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${String(i)}` as keyof Meal;
    const measureKey = `strMeasure${String(i)}` as keyof Meal;
    const ingredient = dish[ingredientKey];
    const measure = dish[measureKey];

    if (typeof ingredient === "string" && ingredient.trim()) {
      ingredients.push({
        ingredient,
        measure: typeof measure === "string" ? measure : undefined,
      });
    }
  }

  return ingredients;
};

const DishPage = () => {
  const { id } = useParams<{ id: string }>();
  const [dish, setDish] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { addFavorite, removeFavorite, isFavorite } = useFavoritesContext();

  useEffect(() => {
    if (!id) {
      setError("Invalid dish ID");
      setLoading(false);
      return;
    }

    const getDish = async () => {
      setLoading(true);
      setError("");

      try {
        const meal = await fetchDishById(id);
        if (meal) {
          setDish(meal);
        } else {
          setError("Dish not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch dish");
      } finally {
        setLoading(false);
      }
    };

    void getDish();
  }, [id]);

  if (loading) {
    return <DishPageSkeleton />;
  }
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!dish) return null;

  const isFav = isFavorite(dish.idMeal);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="flex flex-col gap-8">
        <img
          src={dish.strMealThumb}
          alt={dish.strMeal}
          className="h-96 w-full rounded-3xl object-cover"
        />

        <div className="flex items-start justify-between gap-4">
          <h2 className="text-4xl font-bold">{dish.strMeal}</h2>

          <Button
            variant="ghost"
            icon={
              <Heart
                className={isFav ? "fill-amber text-amber" : "text-mediumgray"}
              />
            }
            onClick={() => {
              isFav ? removeFavorite(dish.idMeal) : addFavorite(dish);
            }}
            className="hidden sm:flex"
          >
            {isFav ? "Saved" : "Save"}
          </Button>
        </div>

        <section className="flex flex-col gap-3">
          <h3 className="text-darkgray text-lg font-semibold">Ingredients</h3>

          <div className="rounded-2xl bg-gray-50 p-4">
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {getIngredientList(dish).map((item, index) => (
                <li key={index} className="flex items-baseline gap-2 text-sm">
                  {item.measure && (
                    <span className="text-mediumgray whitespace-nowrap">
                      {item.measure}
                    </span>
                  )}
                  <span className="font-medium">{item.ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="sm:hidden">
          <Button
            fullWidth
            variant={isFav ? "secondary" : "primary"}
            icon={
              <Heart
                className={isFav ? "text-mediumgray" : "fill-white text-white"}
              />
            }
            onClick={() => {
              isFav ? removeFavorite(dish.idMeal) : addFavorite(dish);
            }}
          >
            {isFav ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </div>

        <section className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Instructions</h3>

          <p className="text-darkgray text-base leading-relaxed whitespace-pre-line">
            {dish.strInstructions}
          </p>
        </section>

        {dish.strYoutube && (
          <section className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Video Tutorial</h3>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${
                  dish.strYoutube.split("v=")[1]
                }`}
                title="YouTube Video"
                className="h-full w-full rounded-3xl"
                allowFullScreen
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default DishPage;
