import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Character, Example } from '../../../shared/types/types'; 
import { HIRAGANA_CHARACTERS } from '../../../shared/data/hiragana'; 

@Component({
  selector: 'app-hiragana-tenten',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tenten.component.html',
  styleUrls: ['./tenten.component.css']
})
export class HiraganaTentenComponent {
  tentenCharacters: Character[] = HIRAGANA_CHARACTERS;
  selectedCharacter: Character | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  showCharacterDetails(character: Character): void {
    if (character.tenten) {
      this.selectedCharacter = character.tenten; 
    }
  }

  closeDetails(): void {
    this.selectedCharacter = null;
  }

  formatExample(example: Example): SafeHtml {
    const formattedSentence = example.sentence || '';
    return this.sanitizer.bypassSecurityTrustHtml(`
      <strong>${example.kanji}</strong> (${example.romaji}) - ${example.english}
      <p><em>${formattedSentence}</em></p>
      <p><strong>Romaji:</strong> ${example.sentenceRomaji || ''}</p>
      <p><strong>Translation:</strong> ${example.sentenceEnglish || ''}</p>
    `);
  }
}
