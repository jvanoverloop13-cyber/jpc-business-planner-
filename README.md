# JPC Business Planner — Update 1.1

This update changes only the Plans & Goals form:
- Target date now uses a number plus Days, Weeks, Months, or Years.
- Removes the separate calendar date field.
- Removes Operations and Marketing from the category choices.
- Adds Other, with a field for a custom category.

All other app sections and features are retained. Existing saved goals and customer records remain in browser storage; older goals keep their existing horizon/category text.

## Upload to GitHub Pages
Upload and replace these files in the repository root: `index.html`, `app.js`, `styles.css`, `manifest.json`, `sw.js`, and `icon.svg`. Keep the filenames exactly as written.

The service worker cache was bumped to v2 so the browser can fetch the updated files. After GitHub Pages publishes, refresh the website or close and reopen the installed app. The app still stores data locally in the browser on that device.
