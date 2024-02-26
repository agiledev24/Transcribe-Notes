//TranscriptionContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TranscriptionContextType {
  liveTranscription: string;
  setLiveTranscription: (transcription: string) => void;
  liveTranscriptions: [];
  addLiveTranscription: (transcription: string) => void;
  finalTranscription: string;
  setFinalTranscription: (transcription: string) => void;
  summarizationResult: string; // Added summarizationResult property
  setSummarizationResult: (result: string) => void; // Added setSummarizationResult method
  generateNewSessionId: () => void;
  currentSessionId: string;
}

const defaultState: TranscriptionContextType = {
  liveTranscription: '',
  setLiveTranscription: () => {},
  liveTranscriptions: [],
  addLiveTranscription: () => {},
  finalTranscription: '',
  setFinalTranscription: () => {},
  summarizationResult: '', // Added default value for summarizationResult
  setSummarizationResult: () => {}, // Added default value for setSummarizationResult
  generateNewSessionId: () => {},
  currentSessionId: '',
};

const TranscriptionContext = createContext<TranscriptionContextType>(defaultState);

export const TranscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [liveTranscription, setLiveTranscription] = useState('');
  const [liveTranscriptions, setLiveTranscriptions] = useState<string[]>([]);
  const [finalTranscription, setFinalTranscription] = useState('');
  const [summarizationResult, setSummarizationResult] = useState(''); // Added summarizationResult state
  const [currentSessionId, setCurrentSessionId] = useState('');

  const generateNewSessionId = () => {
    const newSessionId = uuidv4();
    setCurrentSessionId(newSessionId);
  };

  const addLiveTranscription = (transcription: string) => {
    setLiveTranscriptions(transcriptions => [...transcriptions, transcription]);
  }

  const contextValue = {
    liveTranscription,
    setLiveTranscription,
    liveTranscriptions,
    addLiveTranscription,
    finalTranscription,
    setFinalTranscription,
    summarizationResult, // Added summarizationResult to contextValue
    setSummarizationResult, // Added setSummarizationResult to contextValue
    generateNewSessionId,
    currentSessionId,
  };

  return (
    <TranscriptionContext.Provider value={contextValue}>
      {children}
    </TranscriptionContext.Provider>
  );
};

export default TranscriptionContext;
