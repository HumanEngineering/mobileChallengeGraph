export type WeatherDataResponse = WeatherDataSuccess | WeatherDataError;

export type WeatherDataError = {
  error: boolean;
  reason: string;
};

export type WeatherDataSuccess = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  timezone: string;
  timezone_abbreviation: string;
  hourly: HourlyData;
  hourly_units: HourlyUnits;
};

export type HourlyData = {
  time: string[];
  temperature_2m: number[];
};

export type HourlyUnits = {
  temperature_2m: string;
};
