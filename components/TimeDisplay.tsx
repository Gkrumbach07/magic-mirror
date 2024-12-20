"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"

export default function TimeDisplay() {
	const [currentTime, setCurrentTime] = useState(new Date())

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date())
		}, 60000)

		return () => clearInterval(timer)
	}, [])

	return (
		<div className="text-center space-y-2 sm:space-y-4">
			<h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter">
				{format(currentTime, "HH:mm")}
			</h1>
			<p className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground">
				{format(currentTime, "EEEE, MMMM do, yyyy")}
			</p>
		</div>
	)
} 