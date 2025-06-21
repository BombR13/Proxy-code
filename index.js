const express = require("express");
const axios = require("axios");
const app = express();

const BROWSERLESS_KEY = process.env.BROWSERLESS_KEY;

app.get("/", async (req, res) => {
  const site = req.query.site;
  if (!site) return res.send("Use ?site=https://example.com");

  try {
    const response = await axios.post(
      `https://chrome.browserless.io/content?token=${BROWSERLESS_KEY}`,
      {
        url: site,
        options: {
          waitUntil: "load",
          timeout: 20000,
        },
      }
    );
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Failed to render: " + err.message);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("✅ Proxy running on port " + PORT));
