require("dotenv").config();
const { GoogleGenerativeAI } =
require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/summary", async (req, res) => {

  try {

    const url = req.body.url;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

 const result = await model.generateContent(
      `Give a 2 sentence summary of ${url}`
   );

   const summary = result.response.text();

   const tagResult = await model.generateContent(
  `Generate exactly 3 short tags for ${url}.
   Return only comma separated tags.
   Example:
   DSA,Coding,Interview`
   );
   
   const tagText = tagResult.response.text();
   const tags = tagText
  .split(",")
  .map(tag => tag.trim());
  
    const shortUrl =
      "smart.ly/" +
      Math.random().toString(36).substring(2, 8);

    res.json({
      summary,
      shortUrl,
      tags
    });

  }
  catch(error) {

    console.error(error);

    res.status(500).json({
      error: "Gemini generation failed"
    });

  }

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});