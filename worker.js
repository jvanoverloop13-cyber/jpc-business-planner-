// Cloudflare Worker backend for JPC Business Planner Coach.
// Store OPENAI_API_KEY as a Worker secret. Never put it in app.js or GitHub Pages.
// Set ALLOWED_ORIGIN to the exact GitHub Pages app URL.
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = env.ALLOWED_ORIGIN || "";
    const cors = {
      "Access-Control-Allow-Origin": origin === allowedOrigin ? allowedOrigin : "null",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (origin !== allowedOrigin) return json({ error: "Origin not allowed" }, 403, cors);
    if (request.method !== "POST") return json({ error: "Use POST" }, 405, cors);
    if (!env.OPENAI_API_KEY) return json({ error: "AI service is not configured" }, 503, cors);

    try {
      const body = await request.json();
      const question = String(body.question || "").trim().slice(0, 1200);
      const businessName = String(body.businessName || "J’s Property Care").slice(0, 100);
      const businessType = String(body.businessType || "property services").slice(0, 100);
      if (!question) return json({ error: "Please enter a question" }, 400, cors);

      const ai = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          instructions: `You are JPC Coach, a practical small-business coach for a lawn care and property-services business. The business is ${businessName} and its type is ${businessType}. Give realistic, safe, step-by-step advice for a small business starting out. Be clear about assumptions, do not invent local competitor facts or claim to have researched live market data. If the user asks what other companies do, explain common industry practices and suggest how to verify locally. Use a short heading, numbered steps, and a brief first action. Keep advice understandable and useful.`,
          input: question,
          max_output_tokens: 700
        })
      });
      const payload = await ai.json();
      if (!ai.ok) return json({ error: "The AI service could not complete that request" }, 502, cors);
      const answer = payload.output_text || (payload.output || []).flatMap(item => item.content || []).filter(item => item.type === "output_text").map(item => item.text).join("\n");
      if (!answer) return json({ error: "The AI service returned an empty answer" }, 502, cors);
      return json({ answer }, 200, cors);
    } catch (error) {
      return json({ error: "Unable to process the request" }, 400, cors);
    }
  }
};
function json(data, status, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...headers } });
}
