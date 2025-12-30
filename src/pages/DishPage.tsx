import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Heart } from "lucide-react";

import { useFavoritesContext } from "../context/useFavoritesContext";
import { fetchDishById } from "../services/meals";
import type { Meal } from "../types/mealdb";
import Button from "../components/Button";

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

  if (loading) return <p className="p-4">Loading dish...</p>;
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

        <h2 className="text-4xl font-bold">{dish.strMeal}</h2>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Ingredients</h3>
          <div className="rounded-3xl bg-white p-4">
            <ul className="list-inside list-disc">
              {getIngredientList(dish).map((item, index) => (
                <li
                  key={index}
                  className="border-gray-100 p-4 not-last:border-b"
                >
                  {item.measure} {item.ingredient}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Button
          fullWidth
          variant={isFav ? "secondary" : "primary"}
          icon={
            <Heart
              className={isFav ? "text-mediumgray" : "fill-white text-white"}
            />
          }
          onClick={() => {
            if (isFav) {
              removeFavorite(dish.idMeal);
            } else {
              addFavorite(dish);
            }
          }}
        >
          {isFav ? "Remove from Favorites" : "Add to Favorites"}
        </Button>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Instructions</h3>
          <p className="whitespace-pre-line">{dish.strInstructions}</p>
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
