"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"

export default function TimeDisplay() {
	const [currentTime, setCurrentTime] = useState(new Date())

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date())
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	return (
		<div className="space-y-1">
			<h1 className="text-4xl font-bold tracking-tighter">
				{format(currentTime, "hh:mm a")}
			</h1>
			<p className="text-sm text-muted-foreground">
				{format(currentTime, "EEEE, MMMM do")}
			</p>
		</div>
	)
} 