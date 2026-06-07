import { useState } from "react";

function App() {
   const [url, setUrl] = useState("");
   const [summary, setSummary] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const [shortUrl, setShortUrl] = useState("");
   const [tags, setTags] = useState([]);
 

const handleGenerate = async () => {

  if(url.trim() === ""){
    setError("Please enter a URL");
    setSummary("");
    return;
  }

  setError("");
  setSummary("");
  setShortUrl("");
  setTags([]);
  setLoading(true);

  // setTimeout(() => {
  //   setSummary(`Summary generated for: ${url}`);
  //   setShortUrl("smart.ly/abc123");
  //   setTags(["DSA", "Stack", "LeetCode"]);
  //   setLoading(false);
  // }, 2000);

  try {

const response = await fetch(
  "http://localhost:5000/summary",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      url: url
    })
  }
);

  const data = await response.json();

  setSummary(data.summary);
  setShortUrl(data.shortUrl);
  setTags(data.tags);

} catch(error) {

  setError("Backend connection failed");

}

setLoading(false);
};

  return (
    <div>
      <h1>Smart Link Manager</h1>

      <p>AI-powered URL shortening and summarization</p>

      <input
        type="text"
        placeholder="Paste your URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleGenerate}>Generate</button>
      {error && <p>{error}</p>}
      {shortUrl && <p>Short URL: {shortUrl}</p>}
      {tags.length > 0 && (
         <div>
            <h3>Tags</h3>
            {tags.map((tag,index) => (
               <p key={index}>{tag}</p>
            ))}
        </div>
      )}
      {loading && <p>Generating Summary...</p>}
      {summary && <p>{summary}</p>}
      
    </div>
  );
}

export default App;