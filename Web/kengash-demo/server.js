// Local server for the demo. No packages needed — only Node.js.
// Run:  node server.js     then open  http://localhost:8080
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOST || '127.0.0.1';   // only this computer can open it
const ROOT = path.join(__dirname, 'public');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

// Same security headers that Cloudflare reads from public/_headers
function readHeaders() {
  const out = {};
  try {
    for (const line of fs.readFileSync(path.join(ROOT, '_headers'), 'utf8').split('\n')) {
      const m = line.match(/^\s+([A-Za-z-]+):\s*(.+)$/);
      if (m) out[m[1]] = m[2].trim();
    }
  } catch { /* no _headers file: serve without them */ }
  return out;
}
const SECURITY = readHeaders();

http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  let urlPath;
  try { urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname); }
  catch { res.writeHead(400).end('Bad request'); return; }
  if (urlPath.endsWith('/')) urlPath += 'index.html';

  const file = path.normalize(path.join(ROOT, urlPath));
  const hidden = path.basename(file).startsWith('_');           // never serve _headers
  if (!file.startsWith(ROOT + path.sep) || hidden) { res.writeHead(404).end('Not found'); return; }

  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, SECURITY).end('Not found'); return; }
    res.writeHead(200, {
      ...SECURITY,
      'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
}).listen(PORT, HOST, () => {
  console.log(`Demo is running:  http://localhost:${PORT}`);
  console.log('Stop it with Ctrl + C');
});
