import Fuse from 'fuse.js';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchAvailableAreas = async () => {
  const res = await fetch(`${BASE_URL}/list.php?a=list`);
  const data = await res.json();
  return data?.meals?.map((a) => a.strArea) || [];
};

export const matchCountryToArea = async (country) => {
  const areas = await fetchAvailableAreas();

  const fuse = new Fuse(areas, {
    includeScore: true,
    threshold: 0.4, // adjust as needed
  });

  const result = fuse.search(country);
  return result?.[0]?.item || null;
};

export const fetchMealsByArea = async (area) => {
  const res = await fetch(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
  const data = await res.json();
  return data?.meals || [];
};

export const fetchDishById = async (id) => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  return data?.meals?.[0] || null;
};

