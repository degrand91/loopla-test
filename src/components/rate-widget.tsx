'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SpinningLoader from './ui/spinning-loader';
import { Button } from './ui/button';
import { Rates } from '@/types';


const AUTO_UPDATE_INTERVAL = 300000; // 5 minutes

const exchangeRates = [
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound Sterling", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CNY", name: "Chinese Yuan Renminbi", flag: "🇨🇳" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦" },
  { code: "RUB", name: "Russian Ruble", flag: "🇷🇺" },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰" },
  { code: "MXN", name: "Mexican Peso", flag: "🇲🇽" },
];



const RateWidget = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rates, setRates] = useState<Rates | null>(null);
  const [date, setDate] = useState<string | null>(null);

  const refreshRates = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch('/api/rates');
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      const { data } = await response.json();
      if (!data || !data.rates) {
        throw new Error('Invalid data format');
      }
      setRates(data.rates);
      setDate(data.date);
    } catch (error) {
      setError((error as Error).message || 'Failed to fetch exchange rates');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshRates();
    const intervalId = setInterval(refreshRates, AUTO_UPDATE_INTERVAL);
    return () => clearInterval(intervalId);
  }, [refreshRates]);

  const formatDate = (date: string) =>
    date ? `as of ${new Date(date).toLocaleDateString()}` : '--/--/----';

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row bg-slate-700 text-white">
        <CardTitle className="flex items-center gap-2 text-xl">
          <span className="text-2xl">🇺🇸</span> US Dollar Exchange Rates
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-2">
          <div className="mb-4 text-right text-sm text-muted-foreground">1 USD =</div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {exchangeRates.map(({ code, name, flag }) => (
            <div key={code} className="flex items-center justify-between py-1 text-sm hover:bg-muted/50">
              <div className="flex items-center gap-2">
                <span className="text-xl">{flag}</span>
                <span>{name}</span>
              </div>
              <span className="font-mono tabular-nums" aria-live="polite">
                {loading ? <SpinningLoader size="md" /> : (rates && rates[code]?.toFixed(2)) ?? 'N/A'}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between py-1 text-sm">
            <Button variant="outline" size="sm" onClick={refreshRates} disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
            <div className="mt-4 text-right text-xs text-muted-foreground">
              Rates {date ? formatDate(date) : '--/--/----'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RateWidget;
