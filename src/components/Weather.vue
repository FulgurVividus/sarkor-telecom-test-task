<script setup lang="ts">
import { computed } from "vue";
import { useWeatherStore } from "../store/WeatherStore";
import Day from "./Day.vue";

const weatherStore = useWeatherStore();
const weatherData = computed(() => weatherStore.getWeather);
</script>

<template>
  <h2>Weather in {{ weatherStore.getDisplayLocation }}</h2>
  <ul class="weather">
    <Day
      v-for="(date, index) in weatherData?.time"
      :key="date"
      :date="date"
      :max="weatherData?.temperature_2m_max[index]!"
      :min="weatherData?.temperature_2m_min[index]!"
      :code="weatherData?.weathercode[index]!"
      :isToday="index === 0"
    />
  </ul>
</template>

<style scoped lang="css">
.weather {
  display: flex;
  gap: 2.4rem;
}
</style>
