"use server"

export const getExchangeRates = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/rates`,
      {
        headers: { "Cache-Control": "always" },
      }
    )

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`)
    }

    const jsonResponse = await response.json()
    const { data } = jsonResponse

    if (!data) {
      throw new Error("No exchange rates data found in response.")
    }

    return data
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error)
    throw new Error("Failed to fetch exchange rates. Please try again later.")
  }
}
