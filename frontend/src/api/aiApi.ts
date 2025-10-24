// aiApi.ts - AI Insight generation via OpenRouter API
const key = import.meta.env.VITE_OPENROUTER_KEY;

export async function getAiInsight() {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an AI crypto advisor. Provide short, motivational, non-financial daily insights about crypto investing and discipline.",
          },
          { role: "user", content: "Give today's AI crypto insight." },
        ],
      }),
    });

    const data = await res.json();
    return data?.choices?.[0]?.message?.content || "No AI insight generated.";
  } catch (err) {
    console.error("OpenRouter API error:", err);
    return "Tip: Add VITE_OPENROUTER_KEY to .env to enable live AI insights.";
  }
}
