import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDebounce } from "react-use";
import DishCard from "../components/DishCard";
import { fetchCountryByCity } from "../services/geo";
import { matchCountryToArea, fetchMealsByArea } from "../services/meals";

const SearchResults = () => {
  const { city } = useParams();
  const [debouncedCity, setDebouncedCity] = useState("");
  const [country, setCountry] = useState("");
  const [area, setArea] = useState("");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useDebounce(
    () => {
      setDebouncedCity(city);
    },
    500,
    [city]
  );

  // Step 1: Fetch country from city
  useEffect(() => {
    if (!debouncedCity || debouncedCity.length < 2) return;

    const getData = async () => {
      setLoading(true);
      setError("");

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

    getData();
  }, [debouncedCity]);

  // Step 2: Once we have country, fetch areas from TheMealDB
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

    getArea();
  }, [country]);

  // Step 3: Fetch dishes from matched area
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

    getDishes();
  }, [area]);

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Dishes from {area} cuisine</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dishes.map((dish) => (
          <DishCard key={dish.idMeal} dish={dish} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
