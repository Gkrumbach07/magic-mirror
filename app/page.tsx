import TimeDisplay from "@/components/TimeDisplay"
import WeatherDisplay from "@/components/WeatherDisplay"
import WeatherMap from "@/components/WeatherMap"
import { getWeatherData } from "@/lib/weather"
import InspirationText from "@/components/InspirationText"
import { MADISON_COORDS } from "@/lib/const"



export default async function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Top Bar */}
      <div className="flex justify-between items-start p-8">
        <TimeDisplay />
        <WeatherDisplay />
      </div>

      {/* Inspiration Text */}
      <InspirationText />

      {/* Bottom Map */}
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
        <WeatherMap lat={MADISON_COORDS.lat} lon={MADISON_COORDS.lon} />
      </div>
    </main>
  )
}
