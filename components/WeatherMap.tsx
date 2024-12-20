"use client"

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

// Fallback coordinates for Madison, WI
const MADISON_COORDS = {
	lat: 43.0731,
	lon: -89.4012
}

const MapDisplay = dynamic<MapProps>(
	() => import('./MapDisplay'),
	{
		ssr: false,
		loading: () => (
			<div className="w-full h-[300px] rounded-lg overflow-hidden opacity-75 animate-pulse bg-muted" />
		)
	}
)

type MapProps = { lat: number; lon: number }

export default function WeatherMap({ lat, lon }: MapProps) {
	const [coords, setCoords] = useState({ lat: lat || MADISON_COORDS.lat, lon: lon || MADISON_COORDS.lon })

	useEffect(() => {
		if (!navigator.geolocation) return

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setCoords({
					lat: position.coords.latitude,
					lon: position.coords.longitude
				})
			},
			() => {
				// On error, fallback coordinates are already set
				console.log('Unable to retrieve location')
			}
		)
	}, [lat, lon])

	return <MapDisplay lat={coords.lat} lon={coords.lon} />
} 