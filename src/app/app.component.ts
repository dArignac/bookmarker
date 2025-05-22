import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { rxState } from '@rx-angular/state';
import { Subscription } from 'rxjs';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfilesService } from './profiles.service';
import { GLOBAL_RX_STATE, GlobalState } from './state';
import { SupabaseService } from './supabase.service';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, NavigationComponent, RouterOutlet, ToastContainerComponent],
  providers: [
    {
      provide: GLOBAL_RX_STATE,
      useFactory: () => rxState<GlobalState>(),
    },
  ],
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

  async ngOnInit(): Promise<void> {
    this.loggedInSubscription = this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.serviceProfiles.loadProfiles().then((result) => {
          if (result.error === null) {
            this.globalState.set({ profiles: result.data });
          } else {
            this.serviceToast.showToast(result.error!.message, 'error');
          }
        });
      }
    });
  }

  async ngOnDestroy(): Promise<void> {
    this.loggedInSubscription.unsubscribe();
  }
}
