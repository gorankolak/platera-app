import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDebounce } from "react-use";
import Fuse from "fuse.js";
import DishCard from "../components/DishCard";

const GEO_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const GEO_API_HOST = "wft-geo-db.p.rapidapi.com";

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

    const fetchCountryByCity = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://${GEO_API_HOST}/v1/geo/cities?namePrefix=${debouncedCity}&limit=1&sort=-population`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": GEO_API_KEY,
              "X-RapidAPI-Host": GEO_API_HOST,
            },
          }
        );

        const data = await response.json();

        if (data?.data?.length > 0) {
          const countryName = data.data[0].country;

          setCountry(countryName);
        } else {
          setError("City not found");
        }
      } catch (err) {
        console.log(err);
        setError("Error fetching city data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountryByCity();
  }, [debouncedCity]);

  // Step 2: Once we have country, fetch areas from TheMealDB and match with Fuse.js
  useEffect(() => {
    if (!country) return;

    const matchCountryToArea = async () => {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        const data = await res.json();
        const areas = data?.meals?.map((a) => a.strArea);

        const fuse = new Fuse(areas, {
          includeScore: true,
          threshold: 0.4,
        });

        const result = fuse.search(country);
        const bestMatch = result?.[0]?.item;

        if (bestMatch) {
          setArea(bestMatch);
        } else {
          setError(`No matching cuisine found for country: ${country}`);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch areas from TheMealDB.");
      }
    };

    matchCountryToArea();
  }, [country]);

  // Step 3: Fetch dishes from matched area
  useEffect(() => {
    if (!area) return;

    const fetchDishes = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(
            area
          )}`
        );
        const data = await res.json();
        if (data?.meals?.length > 0) {
          setDishes(data.meals);
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

    fetchDishes();
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
