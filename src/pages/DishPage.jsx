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
    // styling page work in progress
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-4">{dish.strMeal}</h2>
      <img
        src={dish.strMealThumb}
        alt={dish.strMeal}
        className="w-full rounded-lg mb-6"
      />

      <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
      <ul className="list-disc list-inside mb-6">
        {getIngredientList(dish).map((item, index) => (
          <li key={index}>
            {item.measure} {item.ingredient}
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-2">Instructions</h3>
      <p className="mb-6 whitespace-pre-line">{dish.strInstructions}</p>

      {dish.strYoutube && (
        <div className="aspect-video mb-4">
          <iframe
            src={`https://www.youtube.com/embed/${
              dish.strYoutube.split("v=")[1]
            }`}
            title="YouTube Video"
            className="w-full h-full rounded"
            allowFullScreen
          />
        </div>
      )}

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
    </div>
  );
};

export default DishPage;
