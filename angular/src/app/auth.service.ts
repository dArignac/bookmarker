import { inject, Injectable } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  googleProvider = new GoogleAuthProvider();

  user$ = authState(this.auth).pipe(
    filter((user) => user !== null),
    map((user) => user!)
  );

  _isLoggedIn: boolean = false;

  public login(): void {
    signInWithPopup(this.auth, this.googleProvider);
  }

  public logout(): void {
    signOut(this.auth);
  }
}
