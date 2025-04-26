import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiraganaComponent } from '../../components/hiragana/hiragana.component';
import { HiraganaTentenComponent } from '../../components/hiragana/tenten/tenten.component';
import { KatakanaComponent } from '../../components/katakana/katakana.component';
import { KatakanaTentenComponent } from '../../components/katakana/tenten/tenten.component';
import { ActiveComponent } from '../../shared/types/types';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, HiraganaComponent, HiraganaTentenComponent, KatakanaComponent, KatakanaTentenComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  activeComponent: ActiveComponent = ActiveComponent.Hiragana;
  ActiveComponent = ActiveComponent; 

  setActiveComponent(component: ActiveComponent): void {
    this.activeComponent = component;
  }
}