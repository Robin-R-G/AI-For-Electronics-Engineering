import { chromium } from 'playwright-core';
const EXEC='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE='http://localhost:3222/AI-For-Electronics-Engineering';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const b=await chromium.launch({executablePath:EXEC,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
  const p=await b.newPage();
  await p.setViewportSize({width:320,height:900});
  await p.goto(BASE+'/',{waitUntil:'domcontentloaded'}); await sleep(2500);
  const btn = p.locator('button[aria-label="Open menu"]');
  console.log('btn count', await btn.count());
  const box = await btn.boundingBox();
  console.log('burger box', JSON.stringify(box));
  // what is at the burger center point?
  if (box){ const el = await p.evaluate(({x,y})=>{const e=document.elementFromPoint(x,y);return e? (e.tagName+'.'+(e.className||'').toString().slice(0,50)) : 'none';}, {x:box.x+box.width/2,y:box.y+box.height/2}); console.log('element at burger center:', el); }
  await btn.click(); await sleep(1200);
  console.log('after click aria-label:', await p.getAttribute('button[aria-label="Open menu"], button[aria-label="Close menu"]','aria-label'));
  const drawer = await p.evaluate(()=>{const d=document.getElementById('mobile-drawer'); if(!d) return 'no #mobile-drawer'; const cs=getComputedStyle(d); return {hidden:d.hidden, display:cs.display, visibility:cs.visibility, ariaLabel: d.getAttribute('aria-label')};});
  console.log('drawer state:', JSON.stringify(drawer));
  await b.close();
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
