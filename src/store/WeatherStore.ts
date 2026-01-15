import { defineStore } from "pinia";
import type { WeatherStoreI } from "../types/weather-store.type";
import type { DailyWeatherI } from "../types/weather.type";

export const useWeatherStore = defineStore("weatherStore", {
  state: (): WeatherStoreI => ({
    location: "",
    isLoading: false,
    displayLocation: "",
    weather: null,
    hasError: false,
    cityList: [],
  }),
  //
  getters: {
    getDisplayLocation(state): string {
      return state.displayLocation;
    },
    getWeather(state): DailyWeatherI | null {
      return state.weather;
    },
    getHasError(state): boolean {
      return state.hasError;
    },
    getIsLoading(state): boolean {
      return state.isLoading;
    },
    getCityList(state): string[] {
      return state.cityList;
    },
  },
  //
  actions: {
    setLocation(value: string) {
      this.location = value;
    },
    async fetchWeather() {
      this.isLoading = true;
      this.hasError = false;

      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${this.location}`
        );
        const geoData = await geoRes.json();

        if (!geoData.results) throw new Error("Location is not found!");

        const { latitude, longitude, timezone, name } = geoData.results.at(0);
        this.displayLocation = `${name}`;

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );
        const weatherData = await weatherRes.json();
        this.weather = weatherData.daily;
      } catch (error) {
        console.log(error);
        this.hasError = true;
      } finally {
        this.isLoading = false;
      }
    },
    addCityToList(cityName: string) {
      this.cityList.push(cityName);
      this.saveCityList();
    },
    saveCityList() {
      localStorage.setItem("cityList", JSON.stringify(this.cityList));
    },
    updateCityList(newCityList: string[]) {
      this.cityList = newCityList;
    },
  },
});
