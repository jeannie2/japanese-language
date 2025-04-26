import { Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { HomeComponent } from './views/home/home.component';
import { GameComponent } from './views/game/game.component';
import { LoginComponent } from './auth/login/login.component';
import { MyKanjiComponent } from './views/my-kanji/my-kanji.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'login', component: LoginComponent },
    { path: 'main', component: MainComponent },
    { path: 'game', component: GameComponent }, 
    { path: 'learn', component: MainComponent },
    { path: 'my-kanji', component: MyKanjiComponent,  canActivate: [authGuard] },
];