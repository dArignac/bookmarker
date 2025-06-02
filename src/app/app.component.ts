import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationError, Router, RouterOutlet } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { SupabaseService } from '@core/services/supabase/supabase.service';
import { ToastService } from '@core/services/toast/toast.service';
import { ProfilesService } from '@features/profiles/services/profiles.service';
import { rxEffects } from '@rx-angular/state/effects';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';
import { ToastContainerComponent } from '@shared/components/toast-container/toast-container.component';
import { SharedModule } from '@shared/shared.module';
import { Subscription } from 'rxjs';
import { GLOBAL_RX_STATE } from './state';

@Component({
  selector: 'app-root',
  imports: [CommonModule, CoreModule, SharedModule, NavigationComponent, RouterOutlet, ToastContainerComponent],
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
