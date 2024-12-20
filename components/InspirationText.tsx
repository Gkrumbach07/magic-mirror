"use client"

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const INSPIRATIONAL_QUOTES = [
	"The darkest hour has only sixty minutes",
	"Every day is a second chance",
	"Stars can't shine without darkness",
	"You are the universe experiencing itself",
	"Time is an illusion, lunchtime doubly so",
	"The only way out is through",
	"Everything is temporary",
	"You are made of stardust",
	"Reality is merely an illusion, albeit a very persistent one",
	"The void stares back",
	"In the depth of winter, I finally learned that within me there lay an invincible summer",
	"The cosmos is within us",
	"We are all connected; To each other, biologically. To the earth, chemically. To the rest of the universe, atomically",
	"Look again at that dot. That's here. That's home. That's us",
	"We are a way for the cosmos to know itself"
]

export default function InspirationText() {
	const [visible, setVisible] = useState(false)
	const [quote, setQuote] = useState('')

	useEffect(() => {
		const showNewQuote = () => {
			const randomQuote = INSPIRATIONAL_QUOTES[Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length)]
			setQuote(randomQuote)
			setVisible(true)

			// Hide after 8 seconds
			setTimeout(() => setVisible(false), 8000)
		}

		// Show first quote after 15 seconds
		const initialTimeout = setTimeout(showNewQuote, 15000)

		// Show new quote every 45 seconds
		const interval = setInterval(showNewQuote, 45000)

		return () => {
			clearTimeout(initialTimeout)
			clearInterval(interval)
		}
	}, [])

	return (
		<div className="absolute inset-0 flex items-center justify-center pointer-events-none px-12">
			<p
				className={cn(
					"text-2xl font-light tracking-wider text-center transition-opacity duration-2000",
					visible ? "opacity-75" : "opacity-0"
				)}
			>
				{quote}
			</p>
		</div>
	)
} 