import { chromium } from 'playwright-core';
const EXEC='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
(async()=>{
  console.log('launching...');
  const b=await chromium.launch({executablePath:EXEC,headless:true,args:['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage']});
  console.log('launched');
  const p=await b.newPage();
  await p.setViewportSize({width:320,height:800});
  await p.goto('http://localhost:3222/AI-For-Electronics-Engineering/',{waitUntil:'domcontentloaded',timeout:20000});
  console.log('loaded, title=', await p.title());
  await b.close();
  console.log('closed OK');
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
