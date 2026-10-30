// Oh, Fluff! web server for Railway. Serves the game files in this folder.
const http=require('http'), fs=require('fs'), path=require('path');
const DIR=__dirname, PORT=process.env.PORT||8080;
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.ico':'image/x-icon','.txt':'text/plain'};
const ROUTES={'/':'index.html','/privacy':'privacy.html','/.well-known/assetlinks.json':'assetlinks.json'};
http.createServer((req,res)=>{
  let p=decodeURIComponent((req.url||'/').split('?')[0]);
  let f=ROUTES[p]||p.replace(/^\/+/,'');
  f=path.normalize(f); if(f.startsWith('..')||f.includes(path.sep+'..')||f==='server.js'||f==='package.json'){ res.writeHead(404); return res.end('Not found'); }
  const full=path.join(DIR,f);
  fs.readFile(full,(err,data)=>{
    if(err){ res.writeHead(404,{'Content-Type':'text/plain'}); return res.end('Not found'); }
    const ext=path.extname(full).toLowerCase();
    res.writeHead(200,{'Content-Type':TYPES[ext]||'application/octet-stream','Cache-Control':ext==='.html'||f==='sw.js'?'no-cache':'public, max-age=3600'});
    res.end(data);
  });
}).listen(PORT,()=>console.log('Oh, Fluff! running on port '+PORT));
