require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const memoryStore = {}; // temporary memory store

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(bodyParser.json());

app.post('/lead', (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== SECRET_KEY) {
    return res.status(403).json({ error: 'Unauthorized request' });
  }

  const { session_id, name, phone, email, propertyType, location, budget } = req.body;

  if (!memoryStore[session_id]) {
    memoryStore[session_id] = {};
  }

  memoryStore[session_id].name = name || memoryStore[session_id].name || null;
  memoryStore[session_id].phone = phone || memoryStore[session_id].phone || null;
  memoryStore[session_id].email = email || memoryStore[session_id].email || null;
  memoryStore[session_id].propertyType = propertyType || memoryStore[session_id].propertyType || null;
  memoryStore[session_id].location = location || memoryStore[session_id].location || null;
  memoryStore[session_id].budget = budget || memoryStore[session_id].budget || null;

  console.log(`Lead received (session: ${session_id})`);
  console.log(memoryStore[session_id]);

  res.status(200).json({ message: 'Lead stored successfully.' });
});

app.get('/memory/:session_id', (req, res) => {
  const sessionId = req.params.session_id;
  if (!memoryStore[sessionId]) {
    return res.status(404).json({ error: 'Session not found' });
  }
  res.status(200).json({ session_id: sessionId, memory: memoryStore[sessionId] });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
