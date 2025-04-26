import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Character, Example } from '../../../shared/types/types'; 
import { KATAKANA_CHARACTERS } from '../../../shared/data/katakana'; 

@Component({
  selector: 'app-katakana-tenten',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tenten.component.html',
  styleUrls: ['./tenten.component.css']
})
export class KatakanaTentenComponent {
  tentenCharacters: Character[] = KATAKANA_CHARACTERS;
  selectedCharacter: Character | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  showCharacterDetails(character: Character): void {
    if (character.tenten) {
      this.selectedCharacter = character.tenten; 
    } else if (character.maru) {
      this.selectedCharacter = character.maru;
    } else {
      this.selectedCharacter = character;
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