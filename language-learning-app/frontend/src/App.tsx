import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [pronunciation, setPronunciation] = useState("");

  async function handleTranslate() {
    const response = await fetch("http://localhost:8080/api/translations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        sourceLanguage: "English",
        targetLanguage: "Chinese",
      }),
    });

    const data = await response.json();

    setTranslation(data.translation);
    setPronunciation(data.pronunciation);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>TalkLife</h1>

      <textarea
        rows={4}
        cols={50}
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleTranslate}>Translate</button>

      <br />
      <br />

      <h2>Translation</h2>
      <p>{translation}</p>

      <h2>Pronunciation</h2>
      <p>{pronunciation}</p>
    </div>
  );
}

export default App;