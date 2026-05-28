import { useEffect, useState } from "react";
import { franc } from "franc-min";

function App() {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [pronunciation, setPronouciaton] = useState("");
  const [language, setLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [targetLanguageConfirmed, setTargetLanguageConfirmed] = useState(false);
  const [targetLanguageError, setTargetLanguageError] = useState("");

  /** Load saved target language from the session cookie when the app starts. */
  useEffect(() => {
    const savedTargetLanguage = getCookie("targetLanguage");

    if (savedTargetLanguage === "Chinese" || savedTargetLanguage === "English") {
      setTargetLanguage(savedTargetLanguage);
      setTargetLanguageConfirmed(true);
    }
  }, []);

  /** Session cookie that remembers which language the user wants to translate to. */
  function getCookie(name: string): string | null {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(`${name}=`));

    if (!cookie) return null;

    return decodeURIComponent(cookie.split("=")[1]);
  }

  /** Save a session cookie. No expires/max-age means it lasts for the browser session. */
  function saveTargetLanguageCookie(language: string) {
    document.cookie = `targetLanguage=${encodeURIComponent(language)}; path=/`;
  }

  function handleTargetLanguageChange(language: string) {
    setTargetLanguage(language);
    setTargetLanguageConfirmed(false);
    setTargetLanguageError("");
  }

  function handleConfirmTargetLanguage() {
    if (!targetLanguage) {
      setTargetLanguageError("Please choose a target language first.");
      return;
    }

    saveTargetLanguageCookie(targetLanguage);
    setTargetLanguageConfirmed(true);
    setTargetLanguageError("");
  }

  /** identify language in text window */
  function detectInputLanguage(text: string): string {
    if (text.trim().length < 5) {
      return "too short";
    }

    const x = franc(text);

    const languageMap: Record<string, string> = {
      eng: "English",
      deu: "German",
      cmn: "Chinese",
    };

    return languageMap[x] ?? "Unknown";
  }

  /** request translation from backend */
  async function handleTranslate() {
    if (!targetLanguageConfirmed) {
      setTargetLanguageError("Please confirm the target language before translating.");
      return;
    }

    if (!text.trim()) {
      setTargetLanguageError("Please enter text before translating.");
      return;
    }

    setTargetLanguageError("");

    const response = await fetch("http://localhost:8080/api/translations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        sourceLanguage: language,
        targetLanguage,
      }),
    });

    const data = await response.json();

    setTranslation(data.translation);
    setPronouciaton(data.pronunciation);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>TalkLife</h1>

      <div style={{ marginBottom: "0.5rem" }}>
        Detected input language: <strong>{language || "Unknown"}</strong>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="target-language">
          Translate to: 
        </label>

        <select
          id="target-language"
          value={targetLanguage}
          onChange={(e) => handleTargetLanguageChange(e.target.value)}
        >
          <option value="">Choose language...</option>
          <option value="Chinese">Chinese</option>
          <option value="English">English</option>
        </select>

        <button
          type="button"
          onClick={handleConfirmTargetLanguage}
          style={{ marginLeft: "0.5rem" }}
        >
          Confirm ✓
        </button>

        {targetLanguageConfirmed && (
          <span style={{ marginLeft: "0.5rem" }}>
            ✓ {targetLanguage} selected for this session
          </span>
        )}

        {targetLanguageError && (
          <div style={{ marginTop: "0.5rem", color: "red" }}>
            {targetLanguageError}
          </div>
        )}
      </div>

      <textarea
        rows={4}
        cols={50}
        placeholder="Enter text..."
        value={text}
        onChange={(e) => {
          const newText = e.target.value;
          setText(newText);
          setLanguage(detectInputLanguage(newText));
        }}
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
