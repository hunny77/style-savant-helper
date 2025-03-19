
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, CloudRain, Sun, CloudSnow, Umbrella } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherDisplayProps {
  className?: string;
  compact?: boolean;
}

type WeatherData = {
  temp: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy";
  location: string;
};

const WeatherDisplay = ({ className, compact = false }: WeatherDisplayProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch weather data
    const fetchWeather = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock weather data
        const weatherConditions = ["sunny", "cloudy", "rainy", "snowy"];
        const mockWeather: WeatherData = {
          temp: Math.floor(Math.random() * 30) + 5, // Random temp between 5-35°C
          condition: weatherConditions[Math.floor(Math.random() * 4)] as "sunny" | "cloudy" | "rainy" | "snowy",
          location: "San Francisco"
        };
        
        setWeather(mockWeather);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className={cn(
        "rounded-xl flex items-center justify-center p-4 animate-pulse",
        compact ? "h-12" : "h-32",
        className
      )}>
        <div className="bg-secondary/50 w-full h-full rounded-lg"></div>
      </div>
    );
  }

  if (!weather) return null;

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className={cn("text-yellow-500", compact ? "h-4 w-4" : "h-8 w-8")} />;
      case "cloudy":
        return <Cloud className={cn("text-gray-400", compact ? "h-4 w-4" : "h-8 w-8")} />;
      case "rainy":
        return <CloudRain className={cn("text-blue-400", compact ? "h-4 w-4" : "h-8 w-8")} />;
      case "snowy":
        return <CloudSnow className={cn("text-blue-200", compact ? "h-4 w-4" : "h-8 w-8")} />;
      default:
        return <Umbrella className={cn("text-gray-500", compact ? "h-4 w-4" : "h-8 w-8")} />;
    }
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn("flex items-center gap-2 rounded-full py-1 px-3 bg-white border", className)}
      >
        {getWeatherIcon(weather.condition)}
        <span className="text-sm font-medium">{weather.temp}°C</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("p-4 rounded-xl glass-card", className)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Current Weather</h3>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-semibold">{weather.temp}°C</span>
            <span className="text-sm text-muted-foreground mb-1 capitalize">{weather.condition}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{weather.location}</p>
        </div>
        
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary/50">
          {getWeatherIcon(weather.condition)}
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm">
          Outfit Recommendation:
          <span className="block font-medium mt-1">
            {weather.condition === "sunny" && weather.temp > 25 && "Light, breathable clothing"}
            {weather.condition === "sunny" && weather.temp <= 25 && "Light layers, casual wear"}
            {weather.condition === "cloudy" && "Light jacket or sweater"}
            {weather.condition === "rainy" && "Waterproof jacket and shoes"}
            {weather.condition === "snowy" && "Warm coat, boots, and layers"}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default WeatherDisplay;
