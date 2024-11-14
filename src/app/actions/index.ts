"use server"

export const getExchangeRates = async () => {
  try {
    console.log(
      process.env.NEXT_PUBLIC_APP_URL,
      "process.env.NEXT_PUBLIC_APP_URL"
    )
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/rates`)

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
    console.log("Failed to fetch exchange rates:", error)
    throw new Error("Failed to fetch exchange rates. Please try again later.")
  }
}
