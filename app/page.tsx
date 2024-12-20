import TimeDisplay from "@/components/TimeDisplay"
import WeatherDisplay from "@/components/WeatherDisplay"
import WeatherMap from "@/components/WeatherMap"
import { getWeatherData } from "@/lib/weather"

// Madison, WI coordinates
const MADISON_COORDS = {
  lat: 43.0731,
  lon: -89.4012
}

async function getWeather() {
  'use server'
  return getWeatherData(MADISON_COORDS.lat, MADISON_COORDS.lon)
}

export default async function Home() {
  const weather = await getWeather()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background text-foreground py-8 sm:py-12">
      <TimeDisplay />
      <div className="w-full px-8 space-y-8">
        <WeatherMap lat={MADISON_COORDS.lat} lon={MADISON_COORDS.lon} />
        <WeatherDisplay weather={weather} />
      </div>
    </main>
  )
}
