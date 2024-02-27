export interface Word {
  word: string;
  punctuated_word: string;
  start: number;
  end: number;
}

export interface Transcription {
  transcript: string;
  words: Word[];
  speaker: number;
  timestamp: string;
}
