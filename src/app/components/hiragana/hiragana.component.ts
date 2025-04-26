import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Character, Example } from '../../shared/types/types'; 
import { HIRAGANA_CHARACTERS } from '../../shared/data/hiragana'; 

@Component({
  selector: 'app-hiragana',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './hiragana.component.html',
  styleUrls: ['./hiragana.component.css']
})
export class HiraganaComponent implements OnInit {
  hiraganaCharacters: Character[] = HIRAGANA_CHARACTERS;

  selectedCharacter: Character | null = null;
  selectedGifUrl: string | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // console.log('Hiragana Characters:', this.hiraganaCharacters);
  }

  showCharacterDetails(character: Character): void {
    this.selectedCharacter = character;

    if (character.character && character.romaji) {
      this.selectedGifUrl = this.getGifUrl(character.character, character.romaji);
    } else {
      console.error('error showing character details');
      this.selectedGifUrl = null; 
    }  
  }

  closeDetails(): void {
    this.selectedCharacter = null;
    this.selectedGifUrl = null;
  }

  formatExample(example: Example): SafeHtml {
    const formattedSentence = example.sentence || '';
    return this.sanitizer.bypassSecurityTrustHtml(`
      <strong>${example.kanji}</strong> (${example.romaji}) - ${example.english}
      <p><em>${formattedSentence}</em></p>
      <p><strong>Romaji:</strong> ${example.sentenceRomaji}</p>
      <p><strong>Translation:</strong> ${example.sentenceEnglish}</p>
    `);
  }

  private getGifUrl(character: string, romaji: string): string {
    const baseUrl = 'https://pub-a6122b9bec62473bac49b1d967115bf1.r2.dev/hiragana/';
    return `${baseUrl}Hiragana_${romaji}_stroke_order_animation.gif`;
  }
}