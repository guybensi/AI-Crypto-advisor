// coinApi.ts - fetch live coin data from CoinGecko

export async function fetchCoinPrices() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
    );
    if (!res.ok) throw new Error("Failed to fetch coin prices");
    const data = await res.json();

    return [
      {
        symbol: "BTC",
        priceUsd: data.bitcoin.usd,
        change24hPct: data.bitcoin.usd_24h_change.toFixed(2),
      },
      {
        symbol: "ETH",
        priceUsd: data.ethereum.usd,
        change24hPct: data.ethereum.usd_24h_change.toFixed(2),
      },
    ];
  } catch (err) {
    console.error("CoinGecko API error:", err);
    return [
      { symbol: "BTC", priceUsd: 0, change24hPct: 0 },
      { symbol: "ETH", priceUsd: 0, change24hPct: 0 },
    ];
  }
}
