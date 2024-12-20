"use client"

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export default function MapDisplay({ lat, lon }: { lat: number; lon: number }) {
	const mapContainer = useRef<HTMLDivElement>(null)
	const map = useRef<maplibregl.Map | null>(null)
	const zoomLevels = [13, 12, 11, 10, 9]
	const zoomIndex = useRef(0)

	useEffect(() => {
		const container = mapContainer.current
		if (!container) return

		fetch('/api/map-style')
			.then(res => res.json())
			.then(style => {
				map.current = new maplibregl.Map({
					container,
					style,
					center: [lon, lat],
					zoom: zoomLevels[0],
					interactive: false,
					attributionControl: false,
				})

				const cycleZoom = () => {
					if (!map.current) return
					zoomIndex.current = (zoomIndex.current + 1) % zoomLevels.length
					map.current.easeTo({ zoom: zoomLevels[zoomIndex.current], duration: 2000 })
				}

				const interval = setInterval(cycleZoom, 5000)

				return () => {
					clearInterval(interval)
					map.current?.remove()
				}
			})
	}, [lat, lon])

	return (
		<div className="max-w-5xl mx-auto">
			<div ref={mapContainer} className="w-full h-[200px] rounded-2xl overflow-hidden opacity-75" />
		</div>
	)
} 