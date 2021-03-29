const router = require("express").Router();
const puppeteer = require("puppeteer");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const url = "https://www.noellelaureano.com/";

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const text = await page.evaluate(() =>
      Array.from(document.querySelectorAll("h2")).map((link) => ({
        text: link.innerText,
      }))
    );

    // let aparts = await page.$('h2', e => {return {result: e.innerText}})

    await browser.close();

    res.send(text);
  } catch (err) {
    console.log(err);
  }
});

const getApts = async () => {
  const url = "https://streeteasy.com/rentals";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waituntil: "networkidle2" });

  let apts = await page.evaluate(() => {
    const results = document.querySelectorAll(
      "li.Home-apartmentForYou a.Title"
    );
    return results;
  });

  console.log(apts);

  await browser.close();
};
