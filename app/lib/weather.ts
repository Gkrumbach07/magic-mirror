export type WeatherData = {
	current: {
		temp: number
		feels_like: number
		weather: Array<{
			id: number
			main: string
			description: string
			icon: string
		}>
		wind_speed: number
		rain?: { '1h': number }
		snow?: { '1h': number }
	}
	daily: Array<{
		dt: number
		temp: {
			min: number
			max: number
		}
		weather: Array<{
			id: number
			main: string
			description: string
			icon: string
		}>
		pop: number // Probability of precipitation
	}>
	minutely?: Array<{
		precipitation: number
	}>
	alerts?: Array<{
		event: string
		description: string
		start: number
		end: number
	}>
}

export async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
	const res = await fetch(
		`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_API_KEY}`,
		{ next: { revalidate: 300 } } // Cache for 5 minutes
	)

	if (!res.ok) {
		throw new Error('Failed to fetch weather data')
	}

	return res.json()
} 