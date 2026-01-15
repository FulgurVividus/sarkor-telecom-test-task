<script setup lang="ts">
import { getWeatherIcon, formatDay } from "../utils/utils";

const pros = defineProps<{
  date: string;
  max: number;
  min: number;
  code: number;
  isToday: boolean;
}>();
</script>

<template>
  <li class="day">
    <span>{{ getWeatherIcon(code) }}</span>
    <p>{{ isToday ? "Today" : formatDay(date) }}</p>
    <p>
      {{ Math.floor(min) }}&deg; &mdash;
      <strong>{{ Math.ceil(max) }}&deg;</strong>
    </p>
  </li>
</template>

<style scoped lang="css">
.day {
  background-color: #f0d2ce;
  padding: 1.6rem 0 2rem;
  width: 9.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}

.day span {
  font-size: 5.2rem;
}

.day.important {
  background-color: #ecc5c0;
  outline: 2px solid #222;
}
</style>
