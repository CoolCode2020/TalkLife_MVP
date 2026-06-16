import { useState } from "react";

import { createTranslation } from "../api/translationAPI";

export function useTranslation() {
  const [translation, setTranslation] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function translate(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
  ) {
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  }

  return {
    translation,
    pronunciation,
    isLoading,
    translate,
  };
}