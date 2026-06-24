type TargetLanguageSelectorProps = {
  targetLanguage: string;
  targetLanguageConfirmed: boolean;
  targetLanguageError: string;
  onTargetLanguageChange: (language: string) => void;
  onConfirmTargetLanguage: () => void;
};

export function TargetLanguageSelector({
  targetLanguage,
  targetLanguageConfirmed,
  targetLanguageError,
  onTargetLanguageChange,
  onConfirmTargetLanguage,
}: TargetLanguageSelectorProps) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="target-language">Translate to:</label>

      <select
        id="target-language"
        value={targetLanguage}
        onChange={(event) =>
          onTargetLanguageChange(event.target.value)
        }
      >
        <option value="">Choose language...</option>
        <option value="Chinese">Chinese/Chinesisch/中文</option>
        <option value="English">English/Englisch/英语</option>
        <option value="German">German/Deutsch/德语</option>
      </select>

      <button
        type="button"
        onClick={onConfirmTargetLanguage}
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
  );
}
