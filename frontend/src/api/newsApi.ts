// newsApi.ts - fetch crypto news from CryptoPanic
const key = import.meta.env.VITE_CRYPTOPANIC_KEY;

export async function fetchNews() {
  try {
    const res = await fetch(
      `https://cryptopanic.com/api/v1/posts/?auth_token=${key}&filter=hot`
    );
    if (!res.ok) throw new Error("Failed to fetch news");
    const data = await res.json();

    return data.results.map((item: any) => ({
      title: item.title,
      url: item.url,
      source: item.source?.title || "Unknown Source",
    }));
  } catch (err) {
    console.error("CryptoPanic API error:", err);
    return [
      {
        title: "Failed to load news",
        url: "#",
        source: "Error fetching data",
      },
    ];
  }
}
