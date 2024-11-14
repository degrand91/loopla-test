import RateWidget from "@/components/rate-widget";
import { getExchangeRates } from "./actions";
import SpinningLoader from "@/components/ui/spinning-loader";

export default async function Home() {
  let ratesData;
  try {
    ratesData = await getExchangeRates();
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
    return (
      <main className="flex h-screen items-center justify-center">
        <p className="text-red-500">Failed to load exchange rates. Please try again later.</p>
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
