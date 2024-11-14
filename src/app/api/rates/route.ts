import next from "next"

let cache: any = null
let cacheTimestamp: number | null = null
const CACHE_DURATION = process.env.CACHE_TTL || 3600 * 1000 // 1 hour in milliseconds

export async function GET() {
  const now = Date.now()

  if (cache && cacheTimestamp && now - cacheTimestamp < +CACHE_DURATION) {
    console.log("Cache hit")
    return Response.json({ data: cache })
  }

  try {
    const res = await fetch(
      `${process.env.EXCHANGE_API_URL}/latest?access_key=${process.env.EXCHANGE_API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!res.ok || res.status > 300) {
      return Response.error()
    }

    const data = await res.json()

    cache = data
    cacheTimestamp = Date.now()

    return Response.json({ data })
  } catch (error) {
    return Response.error()
  }
}
