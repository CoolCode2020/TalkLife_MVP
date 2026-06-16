import type {

  TranslationRequest,

  TranslationResponse,

} from "../types/types.ts";

export async function createTranslation(
  payload: TranslationRequest
): Promise<TranslationResponse> {

  const response = await fetch(
    "http://localhost:8080/api/translations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(
  `Translation request failed with status ${response.status}`
);
  }

return await response.json() as TranslationResponse;
}