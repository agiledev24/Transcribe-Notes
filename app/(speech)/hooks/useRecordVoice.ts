//useRecordVoice.ts
//useRecordVoice.ts
"use client";


  
import { useEffect, useState, useCallback, useContext, useRef } from "react";
import { Id } from "@/convex/_generated/dataModel";
import {
    CreateProjectKeyResponse,
    LiveClient,
    LiveTranscriptionEvents,
    createClient,
  } from "@deepgram/sdk";
import { useQueue } from "@uidotdev/usehooks";
import TranscriptionContext from "../app/components/TranscriptionContext";



export const useRecordVoice = (documentId: Id<"documents">, onTranscriptionComplete: any) => {
    const [apiKey, setApiKey] = useState<CreateProjectKeyResponse | null>();
    const [, setLoadingKey] = useState(true);
    const { add, remove, first, size, queue } = useQueue<any>([]);
    const [connection, setConnection] = useState<LiveClient | null>();
    const [caption, setCaption] = useState<string | null>();
    const [isListening, setListening] = useState(false);
    const [isProcessing, setProcessing] = useState(false);
    const [micOpen, setMicOpen] = useState(false);
    const [microphone, setMicrophone] = useState<MediaRecorder | null>();
    const [userMedia, setUserMedia] = useState<MediaStream | null>();

    const {
        setLiveTranscription,
        addLiveTranscription,
        generateNewSessionId,
      } = useContext(TranscriptionContext);

    const accumulatedFinalTranscript = useRef("");
    const interimTranscript = useRef("");

    const toggleMicrophone = useCallback(async () => {
        if (microphone && userMedia) {
            setUserMedia(null);
            setMicrophone(null);
            microphone.stop();

            addLiveTranscription(accumulatedFinalTranscript.current);
            setLiveTranscription("");
        } else {
          const userMedia = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });

          generateNewSessionId();
          accumulatedFinalTranscript.current = "";
          interimTranscript.current = "";
    
          const microphone = new MediaRecorder(userMedia);
          microphone.start(500);
    
          microphone.onstart = () => {
            setMicOpen(true);
          };
    
          microphone.onstop = () => {
            setMicOpen(false);
          };
    
          microphone.ondataavailable = (e) => {
            add(e.data);
          };
    
          setUserMedia(userMedia);
          setMicrophone(microphone);
        }
      }, [add, microphone, userMedia]);

    useEffect(() => {
        if (!apiKey) {
            console.log("getting a new api key");
            fetch("/api/deepgram", { cache: "no-store" })
              .then((res) => res.json())
              .then((object) => {
                if (!("key" in object)) throw new Error("No api key returned");
      
                setApiKey(object);
                setLoadingKey(false);
              })
              .catch((e) => {
                console.error(e);
              });
        }
      }, [apiKey]);

      useEffect(() => {
        if (apiKey && "key" in apiKey) {
          console.log("connecting to deepgram");
          const deepgram = createClient(apiKey?.key ?? "");
          const connection = deepgram.listen.live({
            model: "nova",
            interim_results: true,
            smart_format: true,
          });
    
          connection.on(LiveTranscriptionEvents.Open, () => {
            console.log("connection established");
            setListening(true);
          });
    
          connection.on(LiveTranscriptionEvents.Close, () => {
            console.log("connection closed");
            setListening(false);
            setApiKey(null);
            setConnection(null);
          });
    
          connection.on(LiveTranscriptionEvents.Transcript, (data) => {
            const words = data.channel.alternatives[0].words;
            const caption = words
              .map((word: any) => word.punctuated_word ?? word.word)
              .join(" ");

            const isFinal = data.is_final;
            if (caption !== "") {
              setCaption(caption);

              if (isFinal) {
                accumulatedFinalTranscript.current += ` ${caption}`;
                interimTranscript.current = "";
                console.log('final caption: ', caption);
              } else {
                interimTranscript.current += ` ${caption}`;
              }
              setLiveTranscription(accumulatedFinalTranscript.current + interimTranscript.current);
            }
          });
    
          setConnection(connection);
        }
      }, [apiKey]);

    useEffect(() => {
        const processQueue = async () => {
          if (size > 0 && !isProcessing) {
            setProcessing(true);
    
            if (isListening) {
              const blob = first;
              connection?.send(blob);
              remove();
            }
    
            const waiting = setTimeout(() => {
              clearTimeout(waiting);
              setProcessing(false);
            }, 250);
          }
        };
    
        processQueue();
      }, [connection, queue, remove, first, size, isProcessing, isListening]);

    return { micOpen, toggleMicrophone, caption };
};