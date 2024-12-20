export type WeatherData = {
	coord: {
		lon: number
		lat: number
	}
	weather: Array<{
		id: number
		main: string
		description: string
		icon: string
	}>
	base: string
	main: {
		temp: number
		feels_like: number
		temp_min: number
		temp_max: number
		pressure: number
		humidity: number
		sea_level?: number
		grnd_level?: number
	}
	visibility: number
	wind: {
		speed: number
		deg: number
		gust?: number
	}
	rain?: {
		"1h"?: number
		"3h"?: number
	}
	snow?: {
		"1h"?: number
		"3h"?: number
	}
	clouds: {
		all: number
	}
	dt: number
	sys: {
		type?: number
		id?: number
		country: string
		sunrise: number
		sunset: number
	}
	timezone: number
	id: number
	name: string
	cod: number
}

export async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.WEATHER_API_KEY}`,
		{
			cache: 'no-store'
		}
	)

	if (!res.ok) {
		throw new Error('Failed to fetch weather data')
	}

	return res.json()
} 