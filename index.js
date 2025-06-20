const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`<form method="GET" action="/browse">
    <input name="url" placeholder="https://neal.fun" style="width:300px">
    <button>Go</button>
  </form>`);
});

app.get("/browse", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.send("No URL provided.");
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const content = await page.content();
    await browser.close();
    res.send(content);
  } catch (err) {
    console.error(err);
    res.send("Error: " + err.message);
  }
});

app.listen(port, () => console.log("Server running on port " + port));
