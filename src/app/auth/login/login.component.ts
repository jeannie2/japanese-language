import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  isCreatingAccount: boolean = false;

  constructor(private auth: Auth, private router: Router, private firestore: Firestore) {}

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }
    
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        console.log('Logged in:', userCredential.user);
        this.router.navigate(['/']); 
      })
      .catch((error) => {
        console.error('Login error:', error);
        this.errorMessage = this.getErrorMessage(error.code); 
      });
  }

  createAccount(): void {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Account created:', user);

        this.saveUserData(user);

        this.router.navigate(['/']); 
      })
      .catch((error) => {
        console.error('Account creation error:', error);
        this.errorMessage = this.getErrorMessage(error.code); 
      });
  }

  saveUserData(user: any): void {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    setDoc(userRef, {
      email: user.email,
      createdAt: new Date(),
    })
      .then(() => {
        console.log('User data saved to Firestore');
      })
      .catch((error) => {
        console.error('Error saving user data:', error);
        this.errorMessage = 'Failed to save user data. Please try again.';
      });
  }

  getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already in use.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/weak-password':
        return 'The password is too weak. It must be at least 6 characters.';
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      default:
        return 'An unknown error occurred. Please try again.';
    }
  }

  toggleMode(): void {
    this.isCreatingAccount = !this.isCreatingAccount;
  }
  
  logout(): void {
    signOut(this.auth)
      .then(() => {
        console.log('Logged out');
        this.router.navigate(['/login']); 
      })
      .catch((error) => {
        console.error('Logout error:', error);
        this.errorMessage = 'Failed to log out. Please try again.';
      });
  }
}