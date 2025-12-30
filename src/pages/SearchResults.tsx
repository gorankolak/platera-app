import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDebounce } from "react-use";
import { MapPinX, Search } from "lucide-react";

import DishCard from "../components/DishCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";

import { fetchCountryByCity } from "../services/geo";
import { matchCountryToArea, fetchMealsByArea } from "../services/meals";
import type { MealPreview } from "../types/mealdb";

const SearchResults = () => {
  const { city } = useParams<{ city?: string }>();
  const navigate = useNavigate();

  const [debouncedCity, setDebouncedCity] = useState<string>("");
  const [country, setCountry] = useState<string | null>(null);
  const [area, setArea] = useState<string | null>(null);
  const [dishes, setDishes] = useState<MealPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useDebounce(
    () => {
      if (city) {
        setDebouncedCity(city);
      }
    },
    500,
    [city],
  );

  // Step 1: Fetch country from city
  useEffect(() => {
    if (!debouncedCity || debouncedCity.length < 2) return;

    const getCountry = async () => {
      setLoading(true);
      setError(null);

      try {
        const countryName = await fetchCountryByCity(debouncedCity);
        if (!countryName) {
          setError("City not found");
        } else {
          setCountry(countryName);
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching city data.");
      } finally {
        setLoading(false);
      }
    };

    void getCountry();
  }, [debouncedCity]);

  // Step 2: Match country to cuisine area
  useEffect(() => {
    if (!country) return;

    const getArea = async () => {
      try {
        const matchedArea = await matchCountryToArea(country);
        if (matchedArea) {
          setArea(matchedArea);
        } else {
          setError(`No matching cuisine found for country: ${country}`);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch areas from TheMealDB.");
      }
    };

    void getArea();
  }, [country]);

  // Step 3: Fetch dishes for area
  useEffect(() => {
    if (!area) return;

    const getDishes = async () => {
      setLoading(true);

      try {
        const meals = await fetchMealsByArea(area);
        if (meals.length > 0) {
          setDishes(meals);
        } else {
          setError(`No dishes found for cuisine: ${area}`);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch dishes.");
      } finally {
        setLoading(false);
      }
    };

    void getDishes();
  }, [area]);

  if (loading) {
    return <p className="p-4 text-center">Loading...</p>;
  }

  if (error) {
    return (
      <EmptyState
        title={error}
        message="We couldn't find any culinary gems for that location. Please try checking the spelling or search for another city."
        icon={<MapPinX className="mb-16 h-20 w-20 text-gray-400" />}
        action={
          <Button
            fullWidth
            icon={<Search />}
            onClick={() => void navigate("/")}
          >
            Explore dishes
          </Button>
        }
      />
    );
  }

  if (!area) return null;

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-8 lg:gap-10">
        <header className="flex flex-col gap-2 text-center">
          <h2 className="text-4xl font-semibold">
            Dishes from <span className="text-amber italic">{area}</span>{" "}
            cuisine
          </h2>

          <p className="text-text-muted">
            We found {dishes.length} local specialties for you to explore
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {dishes.map((dish) => (
            <DishCard key={dish.idMeal} dish={dish} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
