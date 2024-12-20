"use client"

import { useEffect, useState } from "react"
import WeatherDisplay from "./WeatherDisplay"
import type { WeatherData } from "@/lib/weather"

// Default coordinates (fallback if geolocation fails)
const DEFAULT_COORDS = {
	lat: 51.5074,
	lon: -0.1278
}

export default function WeatherContainer({ getWeather }: {
	getWeather: (lat: number, lon: number) => Promise<WeatherData>
}) {
	const [weather, setWeather] = useState<WeatherData | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					try {
						const data = await getWeather(
							position.coords.latitude,
							position.coords.longitude
						)
						setWeather(data)
					} catch (err) {
						console.error("Failed to fetch weather:", err)
						// Fallback to default coordinates
						const data = await getWeather(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon)
						setWeather(data)
					}
				},
				async (error) => {
					console.error("Geolocation error:", error)
					// Fallback to default coordinates
					const data = await getWeather(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon)
					setWeather(data)
				}
			)
		} else {
			// Fallback for browsers without geolocation
			getWeather(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon)
				.then(setWeather)
		}
	}, [getWeather])

	if (!weather) {
		return <div className="animate-pulse">Loading weather...</div>
	}

	return <WeatherDisplay weather={weather} />
} 