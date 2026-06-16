import { franc } from "franc-min";

export function detectInputLanguage(
    text: string,
): string {

    if (text.trim().length < 5) {
        return "Too Short";
    }

    const detectedLanguageCode = franc(text);

    const languageMap: Record<string, string> = {
        eng: "English",
        deu: "German",
        cmn: "Chinese",
    };

    return (
        languageMap[detectedLanguageCode]
        ?? "Unknown"
    );
}