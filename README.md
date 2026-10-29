# JPC Business Planner (PWA starter)

A separate installable web app for J’s Property Care. It includes:
- Dashboard with customer and goal counts
- Time-based business goals and progress
- Customer contacts with `tel:`, `sms:`, and `mailto:` links
- Bulk campaign drafts (email BCC or a group SMS draft where supported)
- Local data export/import and dark mode
- Basic offline caching

## Important limitations in this starter
- Data is stored in local browser storage on one device. It is not cloud-synced and is not a secure multi-user database.
- Campaign buttons prepare drafts in the phone's configured apps; they do not send automatically.
- Group SMS support varies by phone and carrier. For reliable bulk email/text sending, integrate a compliant provider, consent/opt-out tracking, and server-side credentials before launch.
- The starter is not yet suitable for multiple staff accounts or shared customer data.

## Test locally
Because service workers need localhost or HTTPS, use a local web server rather than opening `index.html` directly.
For example, with Python installed:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Publish on GitHub Pages
1. Sign in to GitHub and create a **new public repository** named `jpc-business-planner` (or another name you prefer).
2. Upload the contents of this ZIP to the repository root. Make sure `index.html`, `app.js`, `styles.css`, `manifest.json`, `sw.js`, and `icon.svg` are at the top level, not inside another nested folder.
3. Open repository **Settings → Pages**.
4. Under build/deployment, choose **Deploy from a branch**.
5. Choose branch **main** and folder **/(root)**, then Save.
6. Wait for GitHub Pages to publish, then open the URL it gives you. It usually looks like `https://YOUR-USERNAME.github.io/jpc-business-planner/`.
7. On Android Chrome, open that URL, tap the three-dot menu, and choose **Install app** or **Add to Home screen**.

## Offline support
The app registers a service worker on HTTPS/localhost. If you change files later, update `CACHE` in `sw.js` (e.g. `jpc-business-planner-v2`) so the browser refreshes its cached assets.

## Suggested next build
1. Add a real account system and database with per-business data isolation.
2. Add secure bulk email and SMS provider integrations with opt-in, unsubscribe/STOP handling, and sending logs.
3. Add revenue/expense tracking and reminders.
