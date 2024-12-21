'use server'

import { getWeatherData } from "@/lib/weather"

export async function getWeather(lat: number, lon: number) {
	return getWeatherData(lat, lon)
}
