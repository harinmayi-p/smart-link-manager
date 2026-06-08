require("dotenv").config();

const mysql = require("mysql2");

const { GoogleGenerativeAI } =
require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const cors = require("cors");
const express = require("express");

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "smart_link_manager"
});

db.connect((err) => {

    if(err){
        console.log("Database connection failed");
        console.log(err);
        return;
    }

    console.log("MySQL Connected");

});

app.use(cors());
app.use(express.json());

app.post("/summary", async (req, res) => {

  try {

    const url = req.body.url;

    const checkQuery = `
      SELECT *
      FROM links
      WHERE original_url = ?
    `;

    db.query(
      checkQuery,
      [url],
      async (err, results) => {

        if(err){
          console.log(err);
          return res.status(500).json({
            error: "Database Error"
          });
        }

        // URL ALREADY EXISTS
        if(results.length > 0){

          console.log("Found Existing Link");

          return res.json({
            summary: results[0].summary,
            shortUrl: results[0].short_url,
            tags: results[0].tags.split(",")
          });

        }

        // NEW URL

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
          .map(tag => tag.trim())
          .slice(0, 3);

        const shortUrl =
          "smart.ly/" +
          Math.random().toString(36).substring(2, 8);

        const insertQuery = `
          INSERT INTO links
          (original_url, short_url, summary, tags)
          VALUES (?, ?, ?, ?)
        `;

        db.query(
          insertQuery,
          [
            url,
            shortUrl,
            summary,
            tags.join(",")
          ],
          (err, result) => {

            if(err){
              console.log(err);
            }
            else{
              console.log("Link Saved");
            }

          }
        );

        res.json({
          summary,
          shortUrl,
          tags
        });

      }
    );

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