export type TranslationRequest = {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
  sessionId?: string;
};

export type TranslationResponse = {
  id: number;
  originalText: string;
  translation: string;
  sourceLanguage: string;
  targetLanguage: string;
  pronunciation: string;
  createdAt: string;
};

export type ApiErrorResponse = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  fieldErrors: Record<string, string>;
};
