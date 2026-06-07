const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/summary", (req, res) => {

    const url = req.body.url;

    console.log("Received URL:", url);

    const shortUrl =
      "smart.ly/" +
      Math.random().toString(36).substring(2, 8);

    res.json({
        summary: `Summary for ${url}`,
        shortUrl: shortUrl,
        tags: ["DSA", "Stack", "LeetCode"]
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});