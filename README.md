# JPC Business Planner — Coach update

This update adds JPC Coach to the Dashboard Quick Start Checklist and adds an Ask JPC Coach question box.

## What it does
- Completing a Quick Start item opens relevant follow-up steps.
- Each follow-up step has a checkbox and a Done button. Done requests guidance for what to do next.
- The question box accepts a user's own business question.
- When configured and online, the app requests a response from the real AI backend.
- When offline, not yet configured, or unable to reach the backend, it switches to the built-in Offline Coach.

## Install the app update
Upload the seven files in this folder's root to the existing GitHub repository, replacing the matching files. Do not upload the `ai-backend` folder to the GitHub Pages root as a way to deploy the backend; it must be deployed separately as a Cloudflare Worker.

## Turn on real AI
The app currently has the AI endpoint left blank intentionally. An adult should follow `ai-backend/SETUP.md` to create and secure the backend, then add the Worker URL to `JPC_COACH_ENDPOINT` in `app.js`. Until that is done, the app correctly uses Offline Coach. Never put an API key in the app files.

## Data
The app continues to save its existing goals, customers, and checklist state in the same local browser storage. This update does not add cloud syncing.
