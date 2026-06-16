type TextInputPanelProps = {
  text: string;
  detectedLanguage: string;
  onTextChange: (text: string) => void;
};

export function TextInputPanel({
  text,
  detectedLanguage,
  onTextChange,
}: TextInputPanelProps) {
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
        onChange={(event) =>
          onTextChange(event.target.value)
        }
      />
    </>
  );
}