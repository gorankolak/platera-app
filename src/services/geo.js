const GEO_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const GEO_API_HOST = 'wft-geo-db.p.rapidapi.com';

export const fetchCountryByCity = async (city) => {
  const response = await fetch(
    `https://${GEO_API_HOST}/v1/geo/cities?namePrefix=${city}&limit=1&sort=-population`,
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': GEO_API_KEY,
        'X-RapidAPI-Host': GEO_API_HOST,
      },
    }
  );

  const data = await response.json();

  const countryName = data?.data?.[0]?.country;
  return countryName || null;
} 