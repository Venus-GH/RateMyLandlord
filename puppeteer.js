const puppeteer = require("puppeteer")(async () => {
  const url =
    "https://streeteasy.com/2-bedroom-apartments-for-rent/manhattan/price:-3000";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waituntil: "networkidle2" });

  await page.evaluate(() => {});
})();
