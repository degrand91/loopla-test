import RateWidget from "@/components/rate-widget";
// import { getExchangeRates } from "./actions";
import SpinningLoader from "@/components/ui/spinning-loader";

export default async function Home() {
  let ratesData;



  const getExchangeRates = async () => {
    "use server"
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

  try {
    ratesData = await getExchangeRates();
  } catch (error) {
    console.log("Failed to fetch exchange rates:", error);
    return (
      <main className="flex h-screen items-center justify-center">
        <p className="text-red-500">Failed to load exchange rates. Please try again later. {process.env.NEXT_PUBLIC_APP_URL}</p>
      </main>
    );
  }

  const { rates, date } = ratesData;

  if (!rates || !date) {
    return (
      <main className="flex h-screen items-center justify-center">
        <SpinningLoader size="lg" />
      </main>
    );
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <RateWidget rates={rates} date={date} refreshRates={getExchangeRates} />
    </main>
  );
}
