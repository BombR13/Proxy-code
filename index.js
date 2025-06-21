const express = require("express");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const app = express();

puppeteer.use(StealthPlugin());

app.get("/", async (req, res) => {
  const site = req.query.site;
  if (!site) return res.send("Add ?site=https://neal.fun");

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto(site, { waitUntil: "load", timeout: 30000 });
    const content = await page.content();
    await browser.close();
    res.send(content);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Proxy running on port " + PORT));
