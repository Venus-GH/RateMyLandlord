const router = require("express").Router();
const puppeteer = require("puppeteer");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const url = "https://www.renthop.com/search/nyc";

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const text = await page.evaluate(() =>
      Array.from(document.querySelectorAll("div.search-listing")).map(
        (node) => ({
          link: node.querySelector("a").href,
          img: node.querySelector("img").src,
          title: node.querySelector("a.listing-title-link").innerText,
          price: node.querySelector("span.font-size-13").innerText,
        })
      )
    );

    await browser.close();

    res.send(text);
  } catch (err) {
    console.log(err);
  }
});
