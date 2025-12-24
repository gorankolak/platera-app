import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFavoritesContext } from "../context/FavoritesContext";
import { fetchDishById } from "../services/meals";
import { Heart } from "lucide-react";
import Button from "../components/Button";

const DishPage = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesContext();

  useEffect(() => {
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

    getDish();
  }, [id]);

  const getIngredientList = (dish) => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = dish[`strIngredient${i}`];
      const measure = dish[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }

    return ingredients;
  };

  if (loading) return <p className="p-4">Loading dish...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  const isFav = isFavorite(dish.idMeal);
  const iconClasses = `mr-2 ${
    isFav ? "text-mediumgray" : "fill-white text-white"
  }`;

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
          onClick={() =>
            isFav ? removeFavorite(dish.idMeal) : addFavorite(dish)
          }
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
