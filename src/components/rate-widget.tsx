'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SpinningLoader from './ui/spinning-loader';
import { Button } from './ui/button';

type Rates = { [key: string]: number };

type RateWidgetProps = {
  rates: Rates,
  date: string,
  refreshRates: () => Promise<void>
};

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

const AUTO_UPDATE_INTERVAL = 300000; // 5 minutes

const RateWidget = ({ rates, date, refreshRates }: RateWidgetProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (rates) setLoading(false);
  }, [rates]);

  useEffect(() => {
    const handleAutoUpdate = async () => {
      setLoading(true);
      await refreshRates();
      setLoading(false);
    };
    const intervalId = setInterval(handleAutoUpdate, AUTO_UPDATE_INTERVAL);
    return () => clearInterval(intervalId);
  }, [refreshRates]);

  const handleManualRefresh = async () => {
    setLoading(true);
    try {
      await refreshRates();
    } finally {
      setLoading(false);
    }
  };

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
          {exchangeRates.map(({ code, name, flag }) => (
            <div key={code} className="flex items-center justify-between py-1 text-sm hover:bg-muted/50">
              <div className="flex items-center gap-2">
                <span className="text-xl">{flag}</span>
                <span>{name}</span>
              </div>
              <span className="font-mono tabular-nums" aria-live="polite">
                {loading ? <SpinningLoader size="md" /> : rates[code]?.toFixed(2) ?? 'N/A'}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between py-1 text-sm ">
            <Button variant="outline" size="sm" onClick={handleManualRefresh} disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
            <div className="mt-4 text-right text-xs text-muted-foreground">
              Rates {formatDate(date)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RateWidget;
