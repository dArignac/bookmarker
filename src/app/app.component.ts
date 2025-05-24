import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { rxEffects } from '@rx-angular/state/effects';
import { Subscription } from 'rxjs';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfilesService } from './profiles.service';
import { GLOBAL_RX_STATE } from './state';
import { SupabaseService } from './supabase.service';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, NavigationComponent, RouterOutlet, ToastContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Bookmarker';
  globalState = inject(GLOBAL_RX_STATE);
  serviceSupabase = inject(SupabaseService);
  serviceProfiles = inject(ProfilesService);
  serviceToast = inject(ToastService);

  isLoggedIn$ = this.serviceSupabase.isLoggedIn$;
  private loggedInSubscription: Subscription = new Subscription();

  profileLoadingError$ = this.globalState.select('errors', 'profiles', 'loading');

  // react if the profile loading failed and show the errror as toast
  readonly effects = rxEffects(({ register }) => {
    register(this.profileLoadingError$, (value) => {
      if (value !== null && value.length > 0) {
        this.serviceToast.showToast(value!, 'error');
      }
    });
  });

  async ngOnInit(): Promise<void> {
    this.loggedInSubscription = this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        // load the profiles and initialize the realtime channel
        this.serviceProfiles.loadProfiles().then((success) => {
          if (success) {
            this.serviceProfiles.initializeRealtimeChannels();
          }
        });
      }
    });
  }

  async ngOnDestroy(): Promise<void> {
    this.loggedInSubscription.unsubscribe();
  }
}
