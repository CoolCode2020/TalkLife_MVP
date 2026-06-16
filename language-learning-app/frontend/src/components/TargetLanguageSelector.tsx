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
        <option value="Chinese">Chinese</option>
        <option value="English">English</option>
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