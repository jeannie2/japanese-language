import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Character, Example } from '../../shared/types/types'; 
import { KATAKANA_CHARACTERS } from '../../shared/data/katakana'; 

@Component({
  selector: 'app-katakana',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './katakana.component.html',
  styleUrls: ['./katakana.component.css']
})
export class KatakanaComponent {
  private readonly CLOUDFLARE_BASE_URL = 'https://pub-a6122b9bec62473bac49b1d967115bf1.r2.dev/katakana';

  katakanaCharacters: Character[] = KATAKANA_CHARACTERS.filter(
    (char) => char.character && char.romaji
  );

  selectedCharacter: Character | null = null;
  selectedGifUrl: string | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  showCharacterDetails(character: Character): void {
    this.selectedCharacter = character;

    if (character.character && character.romaji) {
      this.selectedGifUrl = this.getGifUrl(character.romaji);
      // console.log("Selected GIF URL:", this.selectedGifUrl);
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

  private getGifUrl(romaji: string): string {
    return `${this.CLOUDFLARE_BASE_URL}/Katakana_${romaji}_stroke_order_animation.gif`;
  }
}