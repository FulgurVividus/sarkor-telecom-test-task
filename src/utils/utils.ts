export function getWeatherIcon(wCode: number): string | undefined {
  const icons = new Map<number[], string>([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);

  const arr: number[] | undefined = [...icons.keys()].find((key) =>
    key.includes(wCode)
  );
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

export function formatDay(dateStr: string): string {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

export function capitalizeFirstLetter(value: string): string {
  if (value.length === 0) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}
