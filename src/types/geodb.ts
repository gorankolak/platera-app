export type GeoCity = {
  name: string;
  country: string;
  countryCode: string;
  region?: string;
  latitude?: number;
  longitude?: number;
};

export type GeoCitiesResponse = {
  data: Array<{
    name: string;
    country: string;
    countryCode: string;
    region?: string;
    latitude?: number;
    longitude?: number;
  }>;
};
