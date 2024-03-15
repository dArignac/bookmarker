import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, User } from '@angular/fire/auth';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  auth = inject(Auth);
  googleProvider = new GoogleAuthProvider();

  user$ = authState(this.auth);
  userSubscription!: Subscription;
  userIdToken: string | null = null;

  isLoggedIn: boolean = false;

  ngOnInit() {
    this.userSubscription = this.user$.subscribe((user: User) => {
      this.isLoggedIn = user !== null;

      if (this.isLoggedIn) {
        user.getIdToken().then((token) => {
          this.userIdToken = token;
        });
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  public login(): void {
    this.authService.login();
  }

  public logout(): void {
    this.authService.logout();
  }
}
