import { useEffect, useState } from "react";

import { useTranslation } from "./hooks/useTranslation";
import { detectInputLanguage } from "./utils/detectInputLanguage";
import {
  getCookie,
  saveSessionCookie,
} from "./utils/cookies";

import { TargetLanguageSelector } from "./components/TargetLanguageSelector";
import { TextInputPanel } from "./components/TextInputPanel";
import { TranslationResult } from "./components/TranslationResult";


function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [targetLanguageConfirmed, setTargetLanguageConfirmed] = useState(false);
  const [targetLanguageError, setTargetLanguageError] = useState("");

  const {
    translation,
    pronunciation,
    isLoading,
    translate,
  } = useTranslation();

  /** Load saved target language from the session cookie when the app starts. */
  useEffect(() => {
    const savedTargetLanguage = getCookie("targetLanguage");

    if (
      savedTargetLanguage === "Chinese" ||
      savedTargetLanguage === "English"
    ) {
      setTargetLanguage(savedTargetLanguage);
      setTargetLanguageConfirmed(true);
    }
  }, []);

  function handleTargetLanguageChange(
    language: string,
  ) {
    setTargetLanguage(language);
    setTargetLanguageConfirmed(false);
    setTargetLanguageError("");
  }

  function handleConfirmTargetLanguage() {
    if (!targetLanguage) {
      setTargetLanguageError(
        "Please choose a target language first.",
      );
      return;
    }

    saveSessionCookie(
      "targetLanguage",
      targetLanguage,
    );

    setTargetLanguageConfirmed(true);
    setTargetLanguageError("");
  }

  /** Request translation from the backend through the translation hook. */
  async function handleTranslate() {
    if (!targetLanguageConfirmed) {
      setTargetLanguageError(
        "Please confirm the target language before translating.",
      );
      return;
    }

    if (!text.trim()) {
      setTargetLanguageError(
        "Please enter text before translating.",
      );
      return;
    }

    setTargetLanguageError("");

    await translate(
      text,
      language,
      targetLanguage,
    );
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>TalkLife</h1>

      <TextInputPanel
        text={text}
        detectedLanguage={language}
        onTextChange={(newText) => {
          setText(newText);
          setLanguage(detectInputLanguage(newText));
        }}
      />

      <br />
      <br />

      <TargetLanguageSelector
        targetLanguage={targetLanguage}
        targetLanguageConfirmed={targetLanguageConfirmed}
        targetLanguageError={targetLanguageError}
        onTargetLanguageChange={handleTargetLanguageChange}
        onConfirmTargetLanguage={handleConfirmTargetLanguage}
      />

      <br />
      <br />

      <button
        onClick={handleTranslate}
        disabled={isLoading}
      >
        {isLoading
          ? "Translating..."
          : "Translate"}
      </button>

      <br />
      <br />
      <TranslationResult
        translation={translation}
        pronunciation={pronunciation}
      />
    </div>
  );
}

export default App;