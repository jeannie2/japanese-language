import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Character } from '../../shared/types/types';
import { HIRAGANA_CHARACTERS } from '../../shared/data/hiragana';
import { KATAKANA_CHARACTERS } from '../../shared/data/katakana';

@Component({
  selector: 'app-hiragana-game',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  randomizedCharacters: Character[] = [];
  randomizedDropZones: Character[] = [];
  draggedCharacter: Character | null = null;
  isGameComplete: boolean = false;
  mode: 'hiragana' | 'katakana' = 'hiragana'; 

  ngOnInit(): void {
    this.randomizeCharacters();
  }

  randomizeCharacters(): void {
    const characterSet = this.mode === 'hiragana' ? HIRAGANA_CHARACTERS : KATAKANA_CHARACTERS;
    let shuffledCharacters = [...characterSet]
      .filter((char) => char.character && char.romaji) 
      .sort(() => Math.random() - 0.5); 
  
    shuffledCharacters = shuffledCharacters.slice(0, 5);
  
    let shuffledDropZones = [...shuffledCharacters].sort(() => Math.random() - 0.5);
  
    // ensure character is not adjacent to its romaji 
    let isValid = false;
    while (!isValid) {
      isValid = true;
      for (let i = 0; i < shuffledCharacters.length; i++) {
        if (shuffledCharacters[i].romaji === shuffledDropZones[i].romaji) {
          isValid = false;
          shuffledDropZones = [...shuffledCharacters].sort(() => Math.random() - 0.5); 
          break;
        }
      }
    }
  
    this.randomizedCharacters = shuffledCharacters.map((char) => ({
      character: char.character,
      romaji: char.romaji,
      matched: null
    }));
  
    this.randomizedDropZones = shuffledDropZones.map((char) => ({
      ...char,
      matched: null
    }));
  }

  onDragEnd(): void {
    this.draggedCharacter = null; 
  }

  onDragStart(event: DragEvent, char: Character): void {
    this.draggedCharacter = char;

    this.randomizedDropZones.forEach((zone) => {
      if (zone.matched === false) {
        zone.matched = null; // reset incorrect matches
      }
    });
  }

  onDrop(event: DragEvent, targetChar: Character): void {
    event.preventDefault();
    if (this.draggedCharacter) {
      if (this.draggedCharacter.romaji === targetChar.romaji) {
        targetChar.matched = true;

        // remove dragged character from original array
        this.randomizedCharacters = this.randomizedCharacters.filter(
          (char) => char !== this.draggedCharacter
        );
      } else {
        if (!targetChar.matched) {
          targetChar.matched = false;
        }
      }
    }

    this.isGameComplete = this.randomizedDropZones.every((char) => char.matched === true);
    this.draggedCharacter = null; 
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  resetGame(): void {
    this.randomizeCharacters();
    this.isGameComplete = false;
    this.draggedCharacter = null;
  }

  switchMode(mode: 'hiragana' | 'katakana'): void {
    this.mode = mode; 
    this.resetGame(); 
  }
}