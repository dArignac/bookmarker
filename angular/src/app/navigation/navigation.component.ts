import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, User } from '@angular/fire/auth';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy {
  serviceApi = inject(ApiService);
  serviceAuth = inject(AuthService);
  auth = inject(Auth);
  googleProvider = new GoogleAuthProvider();

  user$ = authState(this.auth);
  userSubscription!: Subscription;

  isLoggedIn: boolean = false;

  ngOnInit() {
    this.userSubscription = this.user$.subscribe((user: User | null) => {
      this.isLoggedIn = user !== null;

      if (this.isLoggedIn) {
        user!.getIdToken().then((token) => {
          this.serviceApi.setAccessToken(token);
        });
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  public login(): void {
    this.serviceAuth.login();
  }

  public logout(): void {
    this.serviceAuth.logout();
  }
}
