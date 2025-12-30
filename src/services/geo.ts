import type { GeoCitiesResponse } from "../types/geodb";

const GEO_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const GEO_API_HOST = "wft-geo-db.p.rapidapi.com";

export const fetchCountryByCity = async (
  city: string,
): Promise<string | null> => {
  const response = await fetch(
    `https://${GEO_API_HOST}/v1/geo/cities?namePrefix=${encodeURIComponent(
      city,
    )}&limit=1&sort=-population`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": GEO_API_KEY,
        "X-RapidAPI-Host": GEO_API_HOST,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch city data");
  }

  const data = (await response.json()) as GeoCitiesResponse;

  return data.data[0]?.country ?? null;
};
