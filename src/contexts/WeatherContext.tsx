
import React, { createContext, useContext, useState, useEffect } from "react";

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  location: string;
}

interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  refreshWeather: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll use mock data instead of a real API call
      // In a real application, you would use something like OpenWeatherMap API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Mock weather data
      const mockWeather: WeatherData = {
        temperature: 22,
        condition: "Partly Cloudy",
        icon: "https://openweathermap.org/img/wn/02d@2x.png",
        location: "New York, US"
      };
      
      setWeather(mockWeather);
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather on initial load
  useEffect(() => {
    fetchWeather();
  }, []);

  const refreshWeather = () => {
    fetchWeather();
  };

  return (
    <WeatherContext.Provider value={{ weather, loading, error, refreshWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
