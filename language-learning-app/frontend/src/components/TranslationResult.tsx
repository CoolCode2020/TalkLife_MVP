type TranslationResultProps = {
  translation: string;
  pronunciation: string;
};

export function TranslationResult({
  translation,
  pronunciation,
}: TranslationResultProps) {
  return (
    <>
      <h2>Translation</h2>
      <p>{translation}</p>

      <h2>Pronunciation</h2>
      <p>{pronunciation}</p>
    </>
  );
}