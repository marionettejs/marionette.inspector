const puppeteer = require('puppeteer');
const path = require('path');

async function runMochaPage (fileName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => {
    const args = msg.args().map(handle => {
      return handle._remoteObject.value
    })
    console.log.apply(console, args);
  });
  await page.goto(`file:///${path.resolve(fileName)}`);
  await page.waitForFunction('window._mochaDone', {polling: 300});
  await browser.close();
}

(async () => {
  await runMochaPage('extension/js/test/unit/AgentSpecRunner.html');
})()


