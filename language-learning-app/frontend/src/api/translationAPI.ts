import type {
  ApiErrorResponse,
  TranslationRequest,
  TranslationResponse,
} from "../types/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export class TranslationApiError extends Error {
  status?: number;
  fieldErrors?: Record<string, string>;

  constructor(message: string, status?: number, fieldErrors?: Record<string, string>) {
    super(message);
    this.name = "TranslationApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export async function createTranslation(
  payload: TranslationRequest
): Promise<TranslationResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/translations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw await buildApiError(response);
  }

  return await response.json() as TranslationResponse;
}

async function buildApiError(response: Response) {
  try {
    const errorResponse = await response.json() as ApiErrorResponse;

    if (import.meta.env.DEV) {
      console.debug("Translation API error", errorResponse);
    }

    return new TranslationApiError(
      errorResponse.message,
      errorResponse.status,
      errorResponse.fieldErrors,
    );
  } catch (error) {
    if (import.meta.env.DEV) {
      console.debug("Unable to parse translation API error", error);
    }

    return new TranslationApiError(
      `Translation request failed with status ${response.status}`,
      response.status,
    );
  }
}
