<!doctype html>
<html lang="de">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>LHIND AI Check · QR & Poster Generator</title>
<!-- QR generation runs fully in your browser. Nothing is uploaded. -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
<style>
  :root{
    --bg:#0B1622; --panel:#10202F; --panelHi:#15293B; --line:#1F3A52;
    --ink:#E8F0F6; --inkDim:#8AA6BC; --amber:#F5A623; --cyan:#36C9D9; --green:#4FD18B;
    --mono:'JetBrains Mono',ui-monospace,monospace;
    --sans:'Inter',system-ui,-apple-system,sans-serif;
  }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
  *{box-sizing:border-box;}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);padding:0;}
  .wrap{max-width:920px;margin:0 auto;padding:0 20px 60px;}
  header{display:flex;align-items:center;gap:12px;padding:22px 0 18px;border-bottom:1px solid var(--line);}
  .logo{width:30px;height:30px;border-radius:6px;background:var(--amber);display:grid;place-items:center;color:var(--bg);font-weight:800;font-family:var(--mono);}
  .eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--amber);}
  h1{font-size:30px;font-weight:800;letter-spacing:-.02em;margin:16px 0 8px;}
  p.lead{color:var(--inkDim);font-size:15px;line-height:1.6;margin:0 0 28px;max-width:620px;}
  label{font-family:var(--mono);font-size:11.5px;color:var(--inkDim);letter-spacing:.08em;text-transform:uppercase;display:block;margin-bottom:8px;}
  input,textarea{width:100%;background:var(--panel);border:1px solid var(--line);color:var(--ink);border-radius:8px;padding:11px 13px;font-size:14px;font-family:var(--sans);}
  input:focus,textarea:focus{outline:none;border-color:var(--cyan);}
  .row{margin-bottom:20px;}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  button{font-family:var(--sans);cursor:pointer;border:none;border-radius:10px;font-weight:700;}
  .btn{background:var(--amber);color:var(--bg);padding:13px 22px;font-size:15px;}
  .btn2{background:transparent;color:var(--ink);border:1px solid var(--line);padding:11px 20px;font-size:14px;font-weight:600;}
  .panel{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:24px;}
  .poster-wrap{margin-top:30px;display:flex;flex-direction:column;align-items:center;gap:18px;}
  /* The actual poster that gets exported */
  #poster{
    width:540px;background:linear-gradient(160deg,#10202F 0%,#0B1622 100%);
    border:1px solid var(--line);border-radius:18px;padding:44px 40px;text-align:center;
    position:relative;overflow:hidden;
  }
  #poster .ptag{font-family:var(--mono);font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--amber);}
  #poster h2{font-size:30px;font-weight:800;letter-spacing:-.02em;margin:14px 0 6px;color:var(--ink);}
  #poster .psub{color:var(--inkDim);font-size:15px;margin:0 0 28px;line-height:1.5;}
  #qrbox{background:#fff;display:inline-block;padding:18px;border-radius:14px;}
  #poster .purl{font-family:var(--mono);font-size:14px;color:var(--cyan);margin-top:24px;word-break:break-all;}
  #poster .pfoot{margin-top:22px;font-size:12px;color:var(--inkDim);line-height:1.5;}
  #poster .accent{position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,var(--amber),var(--cyan),var(--green));}
  .hint{font-family:var(--mono);font-size:11.5px;color:var(--inkDim);margin-top:8px;line-height:1.5;}
  .err{color:#F0556B;font-size:13px;margin-top:8px;}
  .toolbar{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}
  a.linklist{color:var(--cyan);font-size:13.5px;text-decoration:none;display:block;margin:4px 0;}
</style>
</head>
<body>
<div class="wrap">
  <header>
    <div class="logo">AI</div>
    <div>
      <div style="font-weight:700;font-size:15px;">LHIND · QR & Poster Generator</div>
      <div style="font-family:var(--mono);font-size:10.5px;color:var(--inkDim);letter-spacing:.15em;">FÜR DIE VERTEILUNG DES AI LEADERSHIP CHECK</div>
    </div>
  </header>

  <h1>QR-Code & Poster erstellen</h1>
  <p class="lead">Trage die URL ein, unter der deine deployte App erreichbar ist (z. B. <code>https://lhind-aicheck.vercel.app</code>). Du bekommst sofort einen QR-Code und ein druckfertiges Poster. Alles läuft lokal im Browser — nichts wird hochgeladen.</p>

  <div class="panel">
    <div class="row">
      <label for="url">App-URL</label>
      <input id="url" type="url" placeholder="https://lhind-aicheck.vercel.app" value="https://lhind-aicheck.vercel.app" />
      <div class="hint">Tipp: erst die App deployen (Vercel/Netlify), dann die finale URL hier eintragen.</div>
      <div id="urlErr" class="err" style="display:none;"></div>
    </div>
    <div class="grid">
      <div class="row">
        <label for="title">Poster-Titel</label>
        <input id="title" type="text" value="AI Leadership Check" />
      </div>
      <div class="row">
        <label for="sub">Untertitel</label>
        <input id="sub" type="text" value="Wie KI-fit ist deine Führung? · 12 Min · anonym" />
      </div>
    </div>
    <div class="row">
      <label for="foot">Fußzeile</label>
      <input id="foot" type="text" value="Anonym · keine personenbezogenen Daten · Fragen an ase@lhind.dlh.de" />
    </div>
    <button class="btn" onclick="generate()">QR & Poster erzeugen</button>
  </div>

  <div class="poster-wrap" id="out" style="display:none;">
    <div id="poster">
      <div class="accent"></div>
      <div class="ptag" id="p_tag">LHIND · FÜR FÜHRUNGSKRÄFTE</div>
      <h2 id="p_title"></h2>
      <p class="psub" id="p_sub"></p>
      <div id="qrbox"></div>
      <div class="purl" id="p_url"></div>
      <div class="pfoot" id="p_foot"></div>
    </div>
    <div class="toolbar">
      <button class="btn" onclick="downloadPoster()">⬇ Poster als PNG</button>
      <button class="btn2" onclick="downloadQR()">⬇ Nur QR (PNG)</button>
      <button class="btn2" onclick="window.print()">🖨 Drucken</button>
    </div>
    <div class="hint" style="text-align:center;max-width:460px;">Das Poster eignet sich für Folien, Aushänge oder Townhalls. Der reine QR-Code ist gut für Signaturen oder kleine Einbindungen.</div>
  </div>
</div>

<script>
let qrInstance = null;

function isValidUrl(u){
  try { const x = new URL(u); return x.protocol==='http:'||x.protocol==='https:'; }
  catch { return false; }
}

function generate(){
  const url = document.getElementById('url').value.trim();
  const err = document.getElementById('urlErr');
  if(!isValidUrl(url)){
    err.style.display='block';
    err.textContent='Bitte eine gültige URL mit https:// eingeben.';
    return;
  }
  err.style.display='none';

  document.getElementById('p_title').textContent = document.getElementById('title').value;
  document.getElementById('p_sub').textContent = document.getElementById('sub').value;
  document.getElementById('p_url').textContent = url;
  document.getElementById('p_foot').textContent = document.getElementById('foot').value;

  const box = document.getElementById('qrbox');
  box.innerHTML = '';
  qrInstance = new QRCode(box, {
    text: url, width: 240, height: 240,
    colorDark: '#0B1622', colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  document.getElementById('out').style.display='flex';
  document.getElementById('out').scrollIntoView({behavior:'smooth'});
}

// Export the QR canvas alone
function downloadQR(){
  const canvas = document.querySelector('#qrbox canvas');
  if(!canvas){ alert('Bitte zuerst erzeugen.'); return; }
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = 'lhind-aicheck-qr.png';
  a.click();
}

// Render the whole poster to PNG by drawing it onto a canvas.
function downloadPoster(){
  const qrCanvas = document.querySelector('#qrbox canvas');
  if(!qrCanvas){ alert('Bitte zuerst erzeugen.'); return; }

  const W=1080, H=1400, c=document.createElement('canvas');
  c.width=W; c.height=H;
  const ctx=c.getContext('2d');

  // background gradient
  const g=ctx.createLinearGradient(0,0,W,H);
  g.addColorStop(0,'#10202F'); g.addColorStop(1,'#0B1622');
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  // top accent bar
  const ag=ctx.createLinearGradient(0,0,W,0);
  ag.addColorStop(0,'#F5A623'); ag.addColorStop(.5,'#36C9D9'); ag.addColorStop(1,'#4FD18B');
  ctx.fillStyle=ag; ctx.fillRect(0,0,W,12);

  const cx=W/2;
  ctx.textAlign='center';

  ctx.fillStyle='#F5A623';
  ctx.font='600 26px "JetBrains Mono", monospace';
  ctx.fillText('LHIND · FÜR FÜHRUNGSKRÄFTE', cx, 130);

  ctx.fillStyle='#E8F0F6';
  ctx.font='800 60px Inter, sans-serif';
  wrapText(ctx, document.getElementById('title').value, cx, 220, W-160, 66);

  ctx.fillStyle='#8AA6BC';
  ctx.font='400 30px Inter, sans-serif';
  wrapText(ctx, document.getElementById('sub').value, cx, 300, W-200, 40);

  // white QR plate
  const qrSize=520, plate=qrSize+72, px=cx-plate/2, py=400;
  roundRect(ctx, px, py, plate, plate, 28); ctx.fillStyle='#fff'; ctx.fill();
  ctx.drawImage(qrCanvas, cx-qrSize/2, py+36, qrSize, qrSize);

  ctx.fillStyle='#36C9D9';
  ctx.font='500 30px "JetBrains Mono", monospace';
  wrapText(ctx, document.getElementById('url').value, cx, py+plate+70, W-120, 40);

  ctx.fillStyle='#8AA6BC';
  ctx.font='400 24px Inter, sans-serif';
  wrapText(ctx, document.getElementById('foot').value, cx, py+plate+150, W-200, 34);

  const a=document.createElement('a');
  a.href=c.toDataURL('image/png');
  a.download='lhind-aicheck-poster.png';
  a.click();
}

function wrapText(ctx,text,x,y,maxW,lh){
  const words=String(text).split(' '); let line='', yy=y;
  for(const w of words){
    const test=line?line+' '+w:w;
    if(ctx.measureText(test).width>maxW && line){ ctx.fillText(line,x,yy); line=w; yy+=lh; }
    else line=test;
  }
  ctx.fillText(line,x,yy);
}
function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
}

// generate once on load with the placeholder URL
window.addEventListener('load', generate);
</script>
</body>
</html>
