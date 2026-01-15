<script setup lang="ts">
import { onMounted } from "vue";
import Input from "./components/Input.vue";
import Weather from "./components/Weather.vue";
import { useWeatherStore } from "./store/WeatherStore";
import { capitalizeFirstLetter } from "./utils/utils";

const weatherStore = useWeatherStore();
let cityList: string[];
let userResponse: string | null;
let formattedUserResponse: string;

onMounted(() => {
  const savedCityList: string | null = localStorage.getItem("cityList");

  if (savedCityList) {
    cityList = JSON.parse(savedCityList);
    weatherStore.updateCityList(cityList);
  }

  userResponse = prompt(
    `You can choose a city from your list: ${cityList.join(", ")}
    `
  );

  if (userResponse !== null && userResponse !== "") {
    formattedUserResponse = capitalizeFirstLetter(userResponse);
  }

  if (
    userResponse !== null &&
    userResponse !== "" &&
    savedCityList &&
    cityList.includes(formattedUserResponse)
  ) {
    weatherStore.setLocation(formattedUserResponse);
    weatherStore.fetchWeather();
  }
});
</script>

<template>
  <div class="app">
    <h1>Sarkor Telecom Weather</h1>

    <Input />
    <h2 v-if="weatherStore.getIsLoading">Loading...</h2>
    <Weather
      v-if="
        weatherStore.getDisplayLocation &&
        !weatherStore.getHasError &&
        !weatherStore.getIsLoading
      "
    />

    <h2 v-if="weatherStore.getHasError">Location is not found!</h2>
  </div>
</template>

<style lang="css">
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90rem;
  gap: 4rem;
  padding: 6rem 0;
  border: 2px solid #222;
  outline: 2px solid #222;
  outline-offset: 1.2rem;
}
</style>
