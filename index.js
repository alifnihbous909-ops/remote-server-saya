export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // 1. Jika HP 2 minta perintah (berdasarkan URL)
  if (req.method === 'GET' && req.query.action) {
    const { action, value } = req.query;
    return res.status(200).json({ command: { action, value: value === 'true' } });
  }

  // 2. Tampilan Web Remote (HTML) untuk HP 1
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Remote HP</title>
      </head>
      <body style="background:#0f172a;color:white;text-align:center;padding:20px;font-family:sans-serif;">
        <h2>Remote Control HP</h2>
        <button onclick="window.location.href='/?action=flashlight&value=true'" style="padding:20px;font-size:18px;margin:10px;width:80%;border-radius:10px;">🔦 Senter ON</button><br>
        <button onclick="window.location.href='/?action=flashlight&value=false'" style="padding:20px;font-size:18px;margin:10px;width:80%;border-radius:10px;">💡 Senter OFF</button><br>
        <button onclick="window.location.href='/?action=vibrate'" style="padding:20px;font-size:18px;margin:10px;width:80%;border-radius:10px;">📳 Getar</button>
      </body>
      </html>
    `);
  }

  res.status(404).send('Not Found');
}
