import { useRef, useState } from "react";

type SpeechRecognitionConstructor = new () => SpeechRecognition;

type WindowWithSpeechRecognition = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

type UseSpeechRecognitionOptions = {
  onTranscriptChange: (transcript: string) => void;
};

function getSpeechRecognitionApi() {
  const browserWindow = window as WindowWithSpeechRecognition;

  return (
    browserWindow.SpeechRecognition ??
    browserWindow.webkitSpeechRecognition
  );
}

function createTranscriptFromResults(
  results: SpeechRecognitionResultList,
) {
  return Array.from(results)
    .map((result) => result[0].transcript)
    .join(" ");
}

export function useSpeechRecognition({
  onTranscriptChange,
}: UseSpeechRecognitionOptions) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const SpeechRecognitionApi = getSpeechRecognitionApi();
  const isSupported = Boolean(SpeechRecognitionApi);

  function startRecording() {
    if (!SpeechRecognitionApi || isRecording) {
      return;
    }

    const recognition = new SpeechRecognitionApi();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = createTranscriptFromResults(event.results);
      onTranscriptChange(transcript);
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }

  function stopRecording() {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsRecording(false);
  }

  return {
    isRecording,
    isSupported,
    startRecording,
    stopRecording,
  };
}