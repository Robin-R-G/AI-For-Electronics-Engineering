import { chromium } from 'playwright-core';
const EXEC='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE='http://localhost:3222/AI-For-Electronics-Engineering';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const b=await chromium.launch({executablePath:EXEC,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
  const p=await b.newPage();
  // home 320
  await p.setViewportSize({width:320,height:900});
  await p.goto(BASE+'/',{waitUntil:'domcontentloaded'}); await sleep(1500);
  console.log('HOME buttons(aria-label):', await p.$$eval('button[aria-label]', els=>els.map(e=>e.getAttribute('aria-label'))));
  console.log('HOME has Open menu btn:', await p.locator('button[aria-label="Open menu"]').count());
  // ai-tools 1280
  await p.setViewportSize({width:1280,height:900});
  await p.goto(BASE+'/learn/ai-tools/',{waitUntil:'domcontentloaded'}); await sleep(1800);
  console.log('AITOOLS card-like classes sample:', await p.$$eval('main div', els=>{const c=els.filter(e=>/card/i.test(e.className||'')).slice(0,3).map(e=>e.className);return c;}));
  console.log('AITOOLS ToolCard count (class contains Card):', await p.$$eval('main div', els=>els.filter(e=>(e.className||'').match(/Card/i)).length));
  // presenter 1280
  await p.goto(BASE+'/presenter/',{waitUntil:'domcontentloaded'}); await sleep(1800);
  console.log('PRESENTER buttons text:', await p.$$eval('button', els=>els.slice(0,12).map(e=>(e.textContent||'').trim().slice(0,15)+'|'+(e.getAttribute('aria-label')||''))));
  await b.close();
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
