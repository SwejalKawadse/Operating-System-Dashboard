// Tiny static file server using only Node's built-in modules (no dependencies).
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), port = process.env.PORT || 3000;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };
http.createServer((q, s) => {
  let p = q.url.split('?')[0]; if (p === '/') p = '/index.html';
  const f = path.join(root, path.normalize(p));
  if (!f.startsWith(root)) { s.writeHead(403); return s.end(); }
  fs.readFile(f, (e, d) => {
    if (e) { s.writeHead(404); return s.end('Not found'); }
    s.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); s.end(d);
  });
}).listen(port, () => console.log('Dashboard running at http://localhost:' + port));
