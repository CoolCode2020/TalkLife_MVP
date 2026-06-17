type TextInputPanelProps = {
  text: string;
  detectedLanguage: string;
  isRecording: boolean;
  isSpeechRecognitionSupported: boolean;

  onTextChange: (text: string) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onClearText: () => void;
};

export function TextInputPanel({
  text,
  detectedLanguage,
  isRecording,
  isSpeechRecognitionSupported,
  onTextChange,
  onStartRecording,
  onStopRecording,
  onClearText,
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
        Detected input language:{" "}
        <strong>{detectedLanguage || "Unknown"}</strong>
      </div>

      <textarea
        rows={4}
        cols={50}
        placeholder="Enter text..."
        value={text}
        onChange={(event) => onTextChange(event.target.value)}
      />

      <div style={{ marginTop: "0.5rem" }}>
        <button
          type="button"
          onClick={handleRecordingButtonClick}
          disabled={!isSpeechRecognitionSupported}
        >
          {recordingButtonLabel}
        </button>

        <button
          type="button"
          onClick={onClearText}
          disabled={!text}
          style={{ marginLeft: "0.5rem" }}
        >
          🗑 Delete
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