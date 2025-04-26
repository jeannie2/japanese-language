import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

export const authGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(true);
      } else {
        router.navigate(['/login']);
        resolve(false);
      }
    }, (error) => {
      console.error('Auth state check failed:', error);
      resolve(false);
    });
  });
};