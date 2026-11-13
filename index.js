export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const { action, value } = req.query;
    if (action) {
      return res.status(200).json({ command: { action, value: value === 'true' } });
    }
  }

  res.status(404).send('Not Found');
}
