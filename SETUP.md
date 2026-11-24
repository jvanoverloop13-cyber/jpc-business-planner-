# JPC Coach secure AI backend (parent/admin setup)

The app remains usable without this backend. It uses its built-in Offline Coach whenever the device is offline, the backend URL has not been configured, or the AI service cannot be reached.

## Important
- An adult should own and manage the AI provider account and billing.
- Never paste an API key into `app.js`, `index.html`, GitHub, or a public chat.
- This backend uses a Cloudflare Worker. The API key is stored as a Worker secret.
- AI usage may incur charges. Set provider spending limits/alerts before enabling it.

## Deploy the Worker
1. An adult creates/signs in to a Cloudflare account and creates a Worker.
2. Replace the Worker starter code with `worker.js` and deploy it.
3. In Worker Settings → Variables and Secrets, add a secret named `OPENAI_API_KEY` containing the API key from the adult-managed OpenAI API account.
4. Add a plain-text variable named `ALLOWED_ORIGIN` with this exact value: `https://jvanoverloop13-cyber.github.io`.
5. Save and deploy. Copy the Worker URL (for example, `https://jpc-coach.<account>.workers.dev`).
6. In `app.js`, set `JPC_COACH_ENDPOINT` to that Worker URL, keeping the URL inside quotation marks. Do not add the API key there.
7. Upload the updated app files to the existing GitHub Pages repository.

## Verify
- Online: ask JPC Coach a question and confirm the label says **Real AI**.
- Offline or with the Worker unavailable: it should fall back to **Offline Coach**.
- If the browser blocks the request, confirm `ALLOWED_ORIGIN` exactly matches the app's origin (no trailing slash).
