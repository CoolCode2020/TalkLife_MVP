// types/translation.ts

export type TranslationRequest = {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
};

export type TranslationResponse = {
  translation: string;
  pronunciation: string;
};