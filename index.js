const express = require("express");
const axios = require("axios");
const app = express();

const TOKEN = process.env.SCRAPE_KEY;

app.get("/", async (req, res) => {
  const site = req.query.site;
  if (!site) return res.send("Add ?site=https://example.com");

  try {
    const response = await axios.get("https://api.scrapeninja.net/scrape", {
      params: {
        url: site,
        render_js: true,
        token: TOKEN,
      },
    });
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Proxy running on port ${PORT}`));
