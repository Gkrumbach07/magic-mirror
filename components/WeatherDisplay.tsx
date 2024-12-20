import { Droplets, Snowflake, Thermometer } from "lucide-react"
import type { WeatherData } from "@/lib/weather"

function mmToInches(mm: number): number {
	return mm * 0.0393701
}

export default function WeatherDisplay({ weather }: { weather: WeatherData }) {
	const rain1h = weather.rain?.["1h"] ? mmToInches(weather.rain["1h"]).toFixed(2) : null
	const rain3h = weather.rain?.["3h"] ? mmToInches(weather.rain["3h"]).toFixed(2) : null
	const snow1h = weather.snow?.["1h"] ? mmToInches(weather.snow["1h"]).toFixed(2) : null
	const snow3h = weather.snow?.["3h"] ? mmToInches(weather.snow["3h"]).toFixed(2) : null

	return (
		<div className="space-y-4 text-right">
			{/* Current Weather */}
			<div className="flex items-center justify-end gap-2">
				<img
					src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
					alt={weather.weather[0].description}
					className="w-16 h-16"
				/>
				<div>
					<div className="text-4xl font-bold">{Math.round(weather.main.temp)}°F</div>
					<div className="text-muted-foreground">{weather.weather[0].description}</div>
				</div>
			</div>

			{/* High/Low & Feels Like */}
			<div className="space-y-2">
				<div className="flex items-center justify-end gap-2">
					<Thermometer className="w-4 h-4" />
					<span className="text-sm">
						H: {Math.round(weather.main.temp_max)}°F L: {Math.round(weather.main.temp_min)}°F
					</span>
				</div>
				<div className="text-sm text-muted-foreground">
					Feels like {Math.round(weather.main.feels_like)}°F
				</div>
			</div>

			{/* Precipitation */}
			<div className="space-y-1 text-sm">
				{(rain1h || rain3h) && (
					<div className="flex items-center justify-end gap-2">
						<Droplets className="w-4 h-4" />
						<div>
							{rain1h && <div>Rain (1h): {rain1h}"</div>}
							{rain3h && <div>Rain (3h): {rain3h}"</div>}
						</div>
					</div>
				)}
				{(snow1h || snow3h) && (
					<div className="flex items-center justify-end gap-2">
						<Snowflake className="w-4 h-4" />
						<div>
							{snow1h && <div>Snow (1h): {snow1h}"</div>}
							{snow3h && <div>Snow (3h): {snow3h}"</div>}
						</div>
					</div>
				)}
			</div>
		</div>
	)
} 