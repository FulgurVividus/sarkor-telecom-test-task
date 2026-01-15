import type { DailyWeatherI } from "./weather.type";

export interface WeatherStoreI {
  location: string;
  isLoading: boolean;
  displayLocation: string;
  weather: DailyWeatherI | null;
  hasError: boolean;
  cityList: string[];
}
