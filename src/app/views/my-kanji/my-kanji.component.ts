import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc, getFirestore } from '@angular/fire/firestore';
import { Auth, getAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-kanji',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './my-kanji.component.html',
  styleUrls: ['./my-kanji.component.css'],
})
export class MyKanjiComponent {
  savedKanji$: Observable<any[]> | null = null;
  character: string = '';
  romaji: string = '';
  color: string = 'yellow';
  category: string = '';
  editingKanjiId: string | null = null;

  private auth: Auth;
  private firestore: Firestore;

  constructor() {
    this.auth = getAuth(); 
    this.firestore = getFirestore(); 
  }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        const savedKanjiCollection = collection(this.firestore, `users/${user.uid}/savedKanji`);
        this.savedKanji$ = collectionData(savedKanjiCollection, { idField: 'id' }).pipe(
          map((kanjiList) =>
            kanjiList.map((kanji) => ({
              ...kanji,
              rotation: Math.random() * 10 - 5, 
            }))
          )
        );
      }
    });
  }

  addKanji(character: string, romaji: string, color: string, category: string): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        const kanjiDoc = doc(this.firestore, `users/${user.uid}/savedKanji/${character}`);
        setDoc(kanjiDoc, {
          character: character,
          romaji: romaji,
          color: color,
          category: category || null,
          addedAt: new Date(),
        }).then(() => {
          console.log('kanji added successfully');
          this.clearForm();
        }).catch((error) => {
          console.error('Error adding kanji:', error);
        });
      }
    });
  }

  editKanji(kanji: any): void {
    this.editingKanjiId = kanji.id;
    this.character = kanji.character;
    this.romaji = kanji.romaji;
    this.color = kanji.color;
    this.category = kanji.category || '';
  }

  updateKanji(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user && this.editingKanjiId) {
        const kanjiDoc = doc(this.firestore, `users/${user.uid}/savedKanji/${this.editingKanjiId}`);
        setDoc(kanjiDoc, {
          character: this.character,
          romaji: this.romaji,
          color: this.color,
          category: this.category || null,
          updatedAt: new Date(),
        }).then(() => {
          console.log('kanji updated successfully');
          this.clearForm();
        }).catch((error) => {
          console.error('Error updating kanji:', error);
        });
      }
    });
  }

  deleteKanji(kanjiId: string): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        const kanjiDoc = doc(this.firestore, `users/${user.uid}/savedKanji/${kanjiId}`);
        deleteDoc(kanjiDoc)
          .then(() => {
            console.log('kanji deleted successfully');
          })
          .catch((error) => {
            console.error('Error deleting kanji:', error);
          });
      }
    });
  }

  clearForm(): void {
    this.editingKanjiId = null;
    this.character = '';
    this.romaji = '';
    this.color = 'yellow';
    this.category = '';
  }
}