import { chromium } from 'playwright-core';
import fs from 'fs';

const EXEC = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:3222/AI-For-Electronics-Engineering';
const SHOTS = 'C:\\Users\\TONYRA~1\\AppData\\Local\\Temp\\opencode\\shots';

const routes = [
  { name: 'home', path: '/' },
  { name: 'learn-intro', path: '/learn/introduction/' },
  { name: 'ai-tools', path: '/learn/ai-tools/' },
  { name: 'electronics', path: '/learn/electronics-applications/' },
  { name: 'presenter', path: '/presenter/' },
  { name: 'admin', path: '/admin/' },
  { name: 'admin-dash', path: '/admin/dashboard/' },
];
const measureVPs = [320, 375, 390, 414, 480, 768, 1024, 1280, 1440, 1920, 2560];
const shotVPs = [320, 768, 1280, 1920];

const report = { overflow: [], closes: [], errors: [] };

function overflowEval() {
  return `(() => {
    const de = document.documentElement;
    const iw = window.innerWidth;
    const sw = de.scrollWidth;
    const offenders = [];
    document.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.right > iw + 1.5 && r.width > 0 && r.width < 5000) {
        offenders.push({
          tag: el.tagName,
          cls: (typeof el.className === 'string' ? el.className : '').slice(0,70),
          right: Math.round(r.right),
          w: Math.round(r.width)
        });
      }
    });
    offenders.sort((a,b)=>b.right-a.right);
    const seen = new Set(); const top = [];
    for (const o of offenders) { const k = o.tag+'|'+o.cls; if(!seen.has(k)){seen.add(k); top.push(o);} if(top.length>=12) break; }
    return { iw, sw, overflow: sw > iw + 1.5, offenders: top };
  })()`;
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage();

  for (const route of routes) {
    for (const vp of measureVPs) {
      await page.setViewportSize({ width: vp, height: 900 });
      try {
        await page.goto(BASE + route.path, { waitUntil: 'domcontentloaded', timeout: 30000 });
      } catch (e) {
        await page.goto(BASE + route.path, { waitUntil: 'load', timeout: 30000 }).catch(()=>{});
      }
      await sleep(900);
      const m = await page.evaluate(overflowEval);
      report.overflow.push({ route: route.name, vp, iw: m.iw, sw: m.sw, overflow: m.overflow, offenders: m.offenders });
    }
    for (const vp of shotVPs) {
      await page.setViewportSize({ width: vp, height: 1000 });
      await page.goto(BASE + route.path, { waitUntil: 'domcontentloaded' }).catch(()=>{});
      await sleep(900);
      await page.screenshot({ path: `${SHOTS}/${route.name}_${vp}.png`, fullPage: false });
    }
    console.log(`done route ${route.name}`);
  }

  // ---- close button tests ----
  async function visible(sel) { try { return await page.locator(sel).first().isVisible({ timeout: 1500 }); } catch { return false; } }

  // 1. Navbar burger toggle (home, 320)
  try {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' }); await sleep(600);
    const before = await page.getAttribute('button[aria-label="Open menu"], button[aria-label="Close menu"]', 'aria-label');
    await page.click('button[aria-label="Open menu"]'); await sleep(500);
    const opened = await page.getAttribute('button[aria-label="Open menu"], button[aria-label="Close menu"]', 'aria-label');
    await page.click('button[aria-label="Close menu"]'); await sleep(500);
    const closed = await page.getAttribute('button[aria-label="Open menu"], button[aria-label="Close menu"]', 'aria-label');
    report.closes.push({ test:'navbar-burger(320)', pass: before==='Open menu' && opened==='Close menu' && closed==='Open menu', detail:`${before}->${opened}->${closed}` });
  } catch (e) { report.closes.push({ test:'navbar-burger(320)', pass:false, detail:String(e).slice(0,120) }); }

  // 2. Sidebar drawer toggle (learn, 375)
  try {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto(BASE + '/learn/introduction/', { waitUntil: 'domcontentloaded' }); await sleep(900);
    const before = await page.getAttribute('button[aria-label="Open sidebar"], button[aria-label="Close sidebar"]', 'aria-label');
    await page.click('button[aria-label="Open sidebar"]'); await sleep(500);
    const opened = await page.getAttribute('button[aria-label="Open sidebar"], button[aria-label="Close sidebar"]', 'aria-label');
    await page.click('button[aria-label="Close sidebar"]'); await sleep(500);
    const closed = await page.getAttribute('button[aria-label="Open sidebar"], button[aria-label="Close sidebar"]', 'aria-label');
    report.closes.push({ test:'sidebar-drawer(375)', pass: before==='Open sidebar' && opened==='Close sidebar' && closed==='Open sidebar', detail:`${before}->${opened}->${closed}` });
  } catch (e) { report.closes.push({ test:'sidebar-drawer(375)', pass:false, detail:String(e).slice(0,120) }); }

  // 3. ToolDetailView close (ai-tools, 375)
  try {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto(BASE + '/learn/ai-tools/', { waitUntil: 'domcontentloaded' }); await sleep(2000);
    await page.click('div[class*="ToolCard_card"]'); await sleep(600);
    const modalOpen = await visible('button[aria-label="Close"]');
    await page.click('button[aria-label="Close"]'); await sleep(600);
    const modalClosed = await visible('button[aria-label="Close"]');
    report.closes.push({ test:'tool-detail-close(375)', pass: modalOpen && !modalClosed, detail:`open=${modalOpen} closed=${!modalClosed}` });
  } catch (e) { report.closes.push({ test:'tool-detail-close(375)', pass:false, detail:String(e).slice(0,120) }); }

  // 4. ExplorerDetailView close (electronics, 375)
  try {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto(BASE + '/learn/electronics-applications/', { waitUntil: 'domcontentloaded' }); await sleep(2000);
    await page.click('div[class*="ExplorerCard_card"]'); await sleep(600);
    const modalOpen = await visible('button[aria-label="Close"]');
    await page.click('button[aria-label="Close"]'); await sleep(600);
    const modalClosed = await visible('button[aria-label="Close"]');
    report.closes.push({ test:'explorer-detail-close(375)', pass: modalOpen && !modalClosed, detail:`open=${modalOpen} closed=${!modalClosed}` });
  } catch (e) { report.closes.push({ test:'explorer-detail-close(375)', pass:false, detail:String(e).slice(0,120) }); }

  // 5. Presenter shortcuts overlay close (1280) + Escape
  try {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(BASE + '/presenter/', { waitUntil: 'domcontentloaded' }); await sleep(2000);
    await page.click('button:has-text("?")'); await sleep(500);
    const open = await visible('button:has-text("Close")');
    await page.keyboard.press('Escape'); await sleep(500);
    const afterEsc = await visible('button:has-text("Close")');
    report.closes.push({ test:'presenter-shortcuts-esc(1280)', pass: open && !afterEsc, detail:`open=${open} afterEscClosed=${!afterEsc}` });
  } catch (e) { report.closes.push({ test:'presenter-shortcuts-esc(1280)', pass:false, detail:String(e).slice(0,120) }); }

  await browser.close();
  fs.writeFileSync('C:\\Users\\TONYRA~1\\AppData\\Local\\Temp\\opencode\\report.json', JSON.stringify(report, null, 2));
  // console summary
  const fails = report.overflow.filter(o => o.overflow);
  console.log('\n==== OVERFLOW FAILURES ====');
  for (const f of fails) console.log(`${f.route} @${f.vp}px : scrollW=${f.sw} > innerW=${f.iw} | top offenders: ${f.offenders.map(o=>o.tag+'.'+o.cls+'@'+o.right).join(', ')}`);
  if (!fails.length) console.log('NONE');
  console.log('\n==== CLOSE BUTTON TESTS ====');
  for (const c of report.closes) console.log(`${c.pass?'PASS':'FAIL'} - ${c.test} (${c.detail})`);
  console.log('\nreport written to report.json');
})().catch(e => { console.error('FATAL', e); process.exit(1); });
