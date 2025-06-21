const express = require("express");
const axios = require("axios");
const app = express();

const BROWSERLESS_KEY = process.env.BROWSERLESS_KEY;

app.get("/", async (req, res) => {
  const site = req.query.site;
  if (!site) {
    return res.send("🕵️‍♂️ Add ?site=https://example.com");
  }

  try {
    const { data } = await axios.post(
      `https://chrome.browserless.io/content?token=${BROWSERLESS_KEY}`,
      {
        url: site,
        options: {
          waitUntil: "load",
          timeout: 30000,
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.send(data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res
      .status(500)
      .send(
        "❌ Failed to render. Maybe the site blocked the request or your Browserless free plan ran out."
      );
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on port ${PORT}`);
});
