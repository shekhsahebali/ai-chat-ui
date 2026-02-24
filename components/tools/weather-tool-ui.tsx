"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";

type WeatherArgs = {
  location: string;
};

type WeatherResult = {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
};

export const WeatherToolUI = makeAssistantToolUI<WeatherArgs, WeatherResult>({
  toolName: "getWeather",
  render: ({ result }) => {
    if (!result) return <div className="text-sm text-muted-foreground">Getting weather...</div>;

    const getWeatherIcon = (condition: string) => {
      switch (condition.toLowerCase()) {
        case "sunny":
          return <Sun className="h-8 w-8 text-yellow-500" />;
        case "rainy":
          return <CloudRain className="h-8 w-8 text-blue-500" />;
        case "cloudy":
          return <Cloud className="h-8 w-8 text-gray-500" />;
        default:
          return <Wind className="h-8 w-8 text-gray-400" />;
      }
    };

    return (
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-4">
          {getWeatherIcon(result.condition)}
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{result.location}</h3>
            <p className="text-3xl font-bold">{result.temperature}°F</p>
            <p className="text-sm text-muted-foreground">{result.condition}</p>
            <p className="text-sm text-muted-foreground">Humidity: {result.humidity}%</p>
          </div>
        </div>
      </div>
    );
  },
});
