// memeApi.ts - fetch random crypto memes from Reddit

export async function fetchMeme() {
  try {
    const res = await fetch("https://meme-api.com/gimme/cryptomemes");
    if (!res.ok) throw new Error("Failed to fetch meme");
    const data = await res.json();
    return data.url;
  } catch (err) {
    console.error("Meme API error:", err);
    return "https://i.imgflip.com/4/4t0m5.jpg"; // fallback meme
  }
}
