"use client"

import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export default function MapDisplay({ lat, lon }: { lat: number; lon: number }) {
	const mapContainer = useRef<HTMLDivElement>(null)
	const map = useRef<maplibregl.Map | null>(null)
	const [styleCache, setStyleCache] = useState<maplibregl.StyleSpecification | undefined>()

	const initMap = async () => {
		const container = mapContainer.current
		if (!container) return

		// Clean up existing map if any
		if (map.current) {
			map.current.remove()
			map.current = null
		}

		let style = styleCache
		if (!style) {
			style = await fetch('/api/map-style').then(res => res.json())
			setStyleCache(style)
		}

		map.current = new maplibregl.Map({
			container,
			style,
			center: [lon, lat],
			zoom: 11,
			interactive: false,
			attributionControl: false,
		})
	}

	useEffect(() => {
		initMap()

		// Refresh map every 20 minutes
		const refreshInterval = setInterval(() => {
			initMap()
		}, 20 * 60 * 1000)

		return () => {
			clearInterval(refreshInterval)
			if (map.current) {
				map.current.remove()
				map.current = null
			}
		}
	}, [lat, lon])

	return (
		<div className="max-w-5xl mx-auto">
			<div ref={mapContainer} className="w-full h-[200px] rounded-2xl overflow-hidden opacity-75" />
		</div>
	)
} 