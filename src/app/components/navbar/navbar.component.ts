import { Component } from '@angular/core';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = !!user; 
    });
  }

  logout(): void {
    signOut(this.auth)
      .then(() => {
        console.log('Logged out');
        this.router.navigate(['/login']); 
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }
}