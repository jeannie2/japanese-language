export interface Character {
    character?: string;
    romaji?: string;
    matched?: boolean | null; 
    gifUrl?: string;
    pronunciation?: string;
    isFlipped?: boolean;
    tenten?: {
      character: string;
      romaji: string;
      gifUrl?: string;
      pronunciation: string;
      examples?: Example[];
    } | null;
    maru?: {
      character: string;
      romaji: string;
      gifUrl?: string;
      pronunciation: string;
      examples?: Example[];
    } | null;
    examples?: Example[];
  }
  
  export interface Example {
    kanji?: string;
    romaji?: string;
    english?: string;
    sentence?: string;
    sentenceRomaji?: string;
    sentenceEnglish?: string;
  }

  export enum ActiveComponent {
    Hiragana = 'hiragana',
    HiraganaTenten = 'hiragana-tenten',
    Katakana = 'katakana',
    KatakanaTenten = 'katakana-tenten'
  }