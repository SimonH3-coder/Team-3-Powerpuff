import express from 'express';

const router = express.Router();

const NEWSDATA_BASE_URL = 'https://newsdata.io/api/1/news';
const NEWS_QUERY = `"Canary Islands" sustainability OR environment OR renewable OR biodiversity OR ocean OR conservation`;

router.get('/', async (req, res) => {
  const apiKey = process.env.NEWSDATA_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const params = new URLSearchParams({
    apikey: apiKey,
    q: NEWS_QUERY,
    language: 'en',
    size: '10',
  });

  try {
    const response = await fetch(`${NEWSDATA_BASE_URL}?${params}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

export default router;
