const puppeteer = require('puppeteer');
var args = process.argv.splice(2);
console.log(args);
(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Users/18047372/AppData/Local/Google/Chrome/Application/chrome.exe',
    headless:false
  });
  const page = await browser.newPage();
  await page.goto('http://' + args[0]);
  await page.screenshot({
      path: args[0] + '.png',
      fullPage:true,
      quality:100
    });
  await page.emulateMedia('screen');
  await page.pdf({path: './example.pdf', format: 'A4'});
  await browser.close();
})();