import { Heart } from "lucide-react";
import { useFavoritesContext } from "../context/FavoritesContext";
import { useNavigate } from "react-router";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavoritesContext();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    // page work in progress
    return (
      <p className="p-4 text-center">
        No favorites saved yet. <br />
        *Page work in progress*
      </p>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-4">Your Favorites</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((dish) => (
          <div
            key={dish.idMeal}
            className="bg-white rounded shadow relative hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={dish.strMealThumb}
              alt={dish.strMeal}
              className="w-full h-48 object-cover rounded-t"
              onClick={() => navigate(`/dish/${dish.idMeal}`)}
            />
            <div className="p-2">
              <h3 className="text-lg">{dish.strMeal}</h3>
              <button
                onClick={() => removeFavorite(dish.idMeal)}
                className="flex items-center mt-2 text-sm text-amber cursor-pointer transition hover:opacity-90 active:scale-[0.98]"
              >
                <Heart className="mr-2" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
