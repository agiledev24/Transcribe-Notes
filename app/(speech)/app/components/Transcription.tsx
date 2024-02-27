"use client";
import React, { useContext, useEffect } from "react";
import { useTheme } from "next-themes";
import TranscriptionContext from "@/app/(speech)/app/components/TranscriptionContext"; // This is the corrected import path
import VoiceItem from "@/app/(main)/_components/voice-item";

const Transcription = () => {
  const { liveTranscription, finalTranscriptions, currentSessionId } =
    useContext(TranscriptionContext);

  return (
    <div className="flex flex-col gap-[16px]">
      {finalTranscriptions.map((transcription, index) => (
        <VoiceItem key={index} transcription={transcription} />
      ))}
      {liveTranscription && <VoiceItem transcription={liveTranscription} />}
    </div>
  );
};
export default Transcription;
