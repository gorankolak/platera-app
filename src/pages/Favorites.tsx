import { Heart, HeartOff, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router";
import type { MouseEvent } from "react";

import { useFavoritesContext } from "../context/useFavoritesContext";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import DishCard from "../components/DishCard";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavoritesContext();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorite dishes yet!"
        message="Your saved dishes will appear here. Start exploring cuisines and tap the heart icon to keep track of meals you love."
        icon={<HeartOff className="mb-16 h-20 w-20 text-gray-400" />}
        action={
          <Button fullWidth icon={<Search />} onClick={() => navigate("/")}>
            Explore dishes
          </Button>
        }
      />
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-8 lg:gap-10">
        <h2 className="text-4xl font-bold">Your Favorites</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((dish) => (
            <DishCard
              key={dish.idMeal}
              dish={dish}
              action={
                <button
                  type="button"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    removeFavorite(dish.idMeal);
                  }}
                  className="absolute top-4 right-4 rounded-full bg-white/90 p-2 transition hover:scale-105 active:scale-95"
                  aria-label="Remove from favorites"
                >
                  <Heart className="fill-amber text-amber h-4 w-4" />
                </button>
              }
              area={
                <div className="flex items-center gap-2 pt-2 text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <p>{dish.strArea}</p>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
