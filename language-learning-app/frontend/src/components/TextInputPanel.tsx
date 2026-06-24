type SpeechLanguageOption = {
  language: string;
  name: string;
  flag: string;
};

type TextInputPanelProps = {
  text: string;
  detectedLanguage: string;

  speechLanguage: string;
  speechLanguageOptions: SpeechLanguageOption[];

  isRecording: boolean;
  isSpeechRecognitionSupported: boolean;

  onTextChange: (text: string) => void;
  onSpeechLanguageChange: (language: string) => void;

  onStartRecording: () => void;
  onStopRecording: () => void;
};

export function TextInputPanel({
  text,
  detectedLanguage,

  speechLanguage,
  speechLanguageOptions,

  isRecording,
  isSpeechRecognitionSupported,

  onTextChange,
  onSpeechLanguageChange,

  onStartRecording,
  onStopRecording,
}: TextInputPanelProps) {
  const recordingButtonLabel = isRecording
    ? "⏹ Stop"
    : "🎤 Record";

  const handleRecordingButtonClick = isRecording
    ? onStopRecording
    : onStartRecording;

  return (
    <>

      <div style={{ marginBottom: "0.5rem" }}>
        <label htmlFor="speech-language">
          Input language:{" "}
        </label>

        <select
          id="speech-language"
          value={speechLanguage}
          onChange={(event) =>
            onSpeechLanguageChange(event.target.value)
          }
          disabled={isRecording}
        >
          {speechLanguageOptions.map((option) => (
            <option
              key={option.language}
              value={option.language}
            >
              {option.flag} {option.name}
            </option>
          ))}
        </select>
      </div>

      <textarea
        rows={4}
        cols={50}
        placeholder="Enter text..."
        value={text}
        onChange={(event) =>
          onTextChange(event.target.value)
        }
      />

      {detectedLanguage && (
        <p style={{ marginTop: "0.5rem" }}>
          Detected language: {detectedLanguage}
        </p>
      )}

      <div style={{ marginTop: "0.5rem" }}>
        <button
          type="button"
          onClick={handleRecordingButtonClick}
          disabled={!isSpeechRecognitionSupported}
        >
          {recordingButtonLabel}
        </button>
      </div>

      {!isSpeechRecognitionSupported && (
        <p style={{ color: "red" }}>
          Speech recognition is not supported in this browser.
        </p>
      )}
    </>
  );
}
