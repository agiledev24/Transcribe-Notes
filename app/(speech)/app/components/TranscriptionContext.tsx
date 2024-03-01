//TranscriptionContext.tsx
import { Transcription } from "@/app/types";
import React, { createContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

interface TranscriptionContextType {
  liveTranscription: Transcription | null;
  setLiveTranscription: (transcription: Transcription | null) => void;
  finalTranscriptions: Transcription[];
  addFinalTranscription: (transcription: Transcription) => void;
  clearFinalTranscriptions: () => void;
  finalTranscription: Transcription | null;
  setFinalTranscription: (transcription: Transcription | null) => void;
  summarizationResult: string; // Added summarizationResult property
  setSummarizationResult: (result: string) => void; // Added setSummarizationResult method
  generateNewSessionId: () => void;
  currentSessionId: string;
  isTranscribed: boolean;
  setIsTranscribed: (isTranscribed: boolean) => void;
  audioFileUrl: string;
  setAudioFileUrl: (url: string) => void;
  audioCurrentTime: number;
  setAudioCurrentTime: (time: number) => void;
}

const defaultState: TranscriptionContextType = {
  liveTranscription: null,
  setLiveTranscription: () => {},
  finalTranscriptions: [],
  addFinalTranscription: () => {},
  clearFinalTranscriptions: () => {},
  finalTranscription: null,
  setFinalTranscription: () => {},
  summarizationResult: "", // Added default value for summarizationResult
  setSummarizationResult: () => {}, // Added default value for setSummarizationResult
  generateNewSessionId: () => {},
  currentSessionId: "",
  isTranscribed: false,
  setIsTranscribed: () => {},
  audioFileUrl: "",
  setAudioFileUrl: () => {},
  audioCurrentTime: 0,
  setAudioCurrentTime: () => {},
};

const TranscriptionContext =
  createContext<TranscriptionContextType>(defaultState);

export const TranscriptionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [liveTranscription, setLiveTranscription] =
    useState<Transcription | null>(null);
  const [finalTranscriptions, setFinalTranscriptions] = useState<
    Transcription[]
  >([]);
  const [finalTranscription, setFinalTranscription] =
    useState<Transcription | null>(null);
  const [summarizationResult, setSummarizationResult] = useState(""); // Added summarizationResult state
  const [currentSessionId, setCurrentSessionId] = useState("");
  const [isTranscribed, setIsTranscribed] = useState(false);
  const [audioFileUrl, setAudioFileUrl] = useState("");
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);

  const generateNewSessionId = () => {
    const newSessionId = uuidv4();
    setCurrentSessionId(newSessionId);
  };

  const addFinalTranscription = (transcription: Transcription) => {
    setFinalTranscriptions((transcriptions) => [
      ...transcriptions,
      transcription,
    ]);
  };

  const clearFinalTranscriptions = () => {
    setFinalTranscriptions([]);
  }

  const contextValue = {
    liveTranscription,
    setLiveTranscription,
    finalTranscriptions,
    addFinalTranscription,
    clearFinalTranscriptions,
    finalTranscription,
    setFinalTranscription,
    summarizationResult, // Added summarizationResult to contextValue
    setSummarizationResult, // Added setSummarizationResult to contextValue
    generateNewSessionId,
    currentSessionId,
    setIsTranscribed,
    isTranscribed,
    audioFileUrl,
    setAudioFileUrl,
    audioCurrentTime,
    setAudioCurrentTime,
  };

  return (
    <TranscriptionContext.Provider value={contextValue}>
      {children}
    </TranscriptionContext.Provider>
  );
};

export default TranscriptionContext;
