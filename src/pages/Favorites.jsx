import { useFavorites } from "../hooks/useFavorites";
import { useNavigate } from "react-router";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return <p className="p-4 text-center">No favorites saved yet.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-4">Your Favorites</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((dish) => (
          <div
            key={dish.idMeal}
            className="bg-white rounded shadow relative hover:shadow-lg transition"
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
                className="mt-2 text-sm text-amber"
              >
                Remove ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
