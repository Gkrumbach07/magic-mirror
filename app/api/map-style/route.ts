import { NextResponse } from "next/server"

export async function GET() {
	const style = await fetch(
		`https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBAaGJqMkNJbTlVbGQ3aXZxRTsyNGQzMzgwNS0xM2U1LTQ1NWQtOWMzYy0zMzgzMzc2ZWY0ZjY=.json?key=${process.env.TOM_TOM_API_KEY}`,
		{ cache: 'force-cache' }
	).then(res => res.json())

	return NextResponse.json(style)
} 