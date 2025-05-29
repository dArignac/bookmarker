import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationError, Router, RouterOutlet } from '@angular/router';
import { rxEffects } from '@rx-angular/state/effects';
import { Subscription } from 'rxjs';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfilesService } from './services/profiles.service';
import { GLOBAL_RX_STATE } from './state';
import { SupabaseService } from './services/supabase.service';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, NavigationComponent, RouterOutlet, ToastContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Bookmarker';

  router = inject(Router);

  serviceSupabase = inject(SupabaseService);
  serviceProfiles = inject(ProfilesService);
  serviceToast = inject(ToastService);

  globalState = inject(GLOBAL_RX_STATE);
  profilesLoadingError$ = this.globalState.select('errors', 'profiles', 'loading');

  isLoggedIn$ = this.serviceSupabase.isLoggedIn$;
  private loggedInSubscription: Subscription = new Subscription();

  // react if the profile loading failed and show the errror as toast
  readonly effects = rxEffects(({ register }) => {
    register(this.profilesLoadingError$, (value) => {
      if (value !== null && value.length > 0) {
        this.serviceToast.showToast(value!, 'error');
      }
    });
  });

  async ngOnInit(): Promise<void> {
    // FIXME if needed later we can use this to react to the logged in state
    // this.loggedInSubscription = this.isLoggedIn$.subscribe((isLoggedIn) => {
    //   if (isLoggedIn) {
    //   }
    // });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationError) {
        this.router.navigate(['/error'], { state: { message: event.error?.message } });
      }
    });
  }

  async ngOnDestroy(): Promise<void> {
    this.loggedInSubscription.unsubscribe();
  }
}
