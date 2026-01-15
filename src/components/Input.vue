<script setup lang="ts">
import { ref, watch } from "vue";
import { useWeatherStore } from "../store/WeatherStore";

const inputValue = ref<string>("");
const weatherStore = useWeatherStore();

watch(inputValue, (val) => {
  weatherStore.setLocation(val);
});

function handleSearch(): void {
  weatherStore.fetchWeather();
}

function handleSaveCity(): void {
  if (
    !weatherStore.getDisplayLocation ||
    weatherStore.getCityList.includes(weatherStore.getDisplayLocation)
  ) {
    return;
  }
  weatherStore.addCityToList(weatherStore.getDisplayLocation);
  alert("Added successfully to the list!");
}
</script>

<template>
  <form @submit.prevent="handleSearch()" class="search-bar">
    <el-input
      type="text"
      inputmode="text"
      placeholder="Search from..."
      v-model="inputValue"
      class="search-bar-input"
    />

    <button type="submit" title="Search" class="search-bar-submit">
      <el-icon><Search /></el-icon>
    </button>
    <button
      type="button"
      title="Add City to List"
      @click="handleSaveCity()"
      class="search-bar-like"
    >
      <el-icon><CirclePlus /></el-icon>
    </button>
  </form>
</template>

<style scoped lang="css">
.search-bar {
  display: flex;
  align-items: center;
  background-color: #f0d2ce;
  border-radius: 0.6rem;
  width: fit-content;
}

.search-bar-input :deep(.el-input__wrapper) {
  background: transparent;
  box-shadow: none;
  padding: 1.2rem 1.6rem;
}

.search-bar-input :deep(.el-input__inner) {
  font-family: inherit;
  color: #222;
  font-size: 1.8rem;
  border: none;
  background: transparent;
  width: 28rem;
}

.search-bar-input :deep(.el-input__inner)::placeholder {
  color: #334;
}

.search-bar-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: none;
}

.search-bar-submit,
.search-bar-like {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.2rem;
  border: none;
  background: transparent;
  cursor: pointer;
}

.search-bar-submit:active,
.search-bar-like:active {
  transform: scale(0.9);
}
</style>
