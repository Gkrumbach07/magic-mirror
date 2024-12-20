"use client"

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export default function MapDisplay({ lat, lon }: { lat: number; lon: number }) {
	const mapContainer = useRef<HTMLDivElement>(null)
	const map = useRef<maplibregl.Map | null>(null)

	useEffect(() => {
		if (!mapContainer.current) return

		map.current = new maplibregl.Map({
			container: mapContainer.current,
			style: `https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBAaGJqMkNJbTlVbGQ3aXZxRTsyNGQzMzgwNS0xM2U1LTQ1NWQtOWMzYy0zMzgzMzc2ZWY0ZjY=.json?key=${process.env.NEXT_PUBLIC_TOM_TOM_API_KEY}`,
			center: [lon, lat],
			zoom: 10,
			interactive: false,
			attributionControl: false,
		})

		return () => {
			map.current?.remove()
		}
	}, [lat, lon])

	return <div ref={mapContainer} className="w-full h-[300px] rounded-lg overflow-hidden opacity-75" />
} 