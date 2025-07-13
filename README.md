# Real Estate AI Agent

This Node.js server accepts POST requests from a VAPI.ai voice agent,
stores memory by session ID, and allows viewing stored memory.

## Endpoints

- `POST /lead`: Save lead data and update session memory
- `GET /memory/:session_id`: View memory for a given session

## Deployment

Use services like [Render](https://render.com) to deploy this API.

Set these environment variables:
- `PORT`
- `SECRET_KEY`

