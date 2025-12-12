import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDebounce } from "react-use";

const GEO_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const GEO_API_HOST = "wft-geo-db.p.rapidapi.com";

const SearchResults = () => {
  const { city } = useParams();
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [debouncedCity, setDebouncedCity] = useState("");

  useDebounce(
    () => {
      setDebouncedCity(city);
    },
    500,
    [city]
  );

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

        console.log(data);

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

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">City: {debouncedCity}</h2>
      <h3 className="text-xl">Country: {country}</h3>
      {/* Later you'll use this `country` to fetch dishes from TheMealDB */}
    </div>
  );
};

export default SearchResults;
