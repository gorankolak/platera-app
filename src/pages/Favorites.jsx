import { Heart, HeartOff, MapIcon, MapPin, Search } from "lucide-react";
import { useFavoritesContext } from "../context/FavoritesContext";
import { useNavigate } from "react-router";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavoritesContext();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorite dishes yet!"
        message="Your saved dishes will appear here. Start exploring cuisines and tap the heart
  icon to keep track of meals you love."
        icon={<HeartOff className="w-20 h-20 mb-16 text-gray-400" />}
        action={
          <Button fullWidth icon={<Search />} onClick={() => navigate("/")}>
            Explore dishes
          </Button>
        }
      />
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-8">Your Favorites</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((dish) => (
          <div
            key={dish.idMeal}
            className="relative flex flex-col bg-white rounded-3xl p-3 shadow hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={dish.strMealThumb}
              alt={dish.strMeal}
              className="w-full h-48 mb-2 object-cover rounded-3xl"
              onClick={() => navigate(`/dish/${dish.idMeal}`)}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFavorite(dish.idMeal);
              }}
              className="absolute top-4 right-4 bg-white/90 rounded-full p-2 
               hover:scale-105 transition active:scale-95"
              aria-label="Remove from favorites"
            >
              <Heart className="fill-amber text-amber w-4 h-4" />
            </button>

            <h3 className="text-lg mb-2">{dish.strMeal}</h3>
            <p className="flex mb-2 text-l text-gray-400">
              <MapPin className="mr-2" />
              {dish.strArea}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
