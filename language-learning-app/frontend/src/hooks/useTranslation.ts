import { useState } from "react";

import { createTranslation } from "../api/translationAPI";

export function useTranslation() {
  const [translation, setTranslation] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function translate(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
  ) {
    setIsLoading(true);
    setError("");

    try {
      const translationResponse =
        await createTranslation({
          text,
          sourceLanguage,
          targetLanguage,
        });

      setTranslation(
        translationResponse.translation,
      );

      setPronunciation(
        translationResponse.pronunciation,
      );
    } catch (translationError) {
      const message = translationError instanceof Error
        ? translationError.message
        : "Translation failed. Please try again.";

      if (import.meta.env.DEV) {
        console.debug("Translation request failed", translationError);
      }

      setTranslation("");
      setPronunciation("");
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    translation,
    pronunciation,
    error,
    isLoading,
    translate,
  };
}
