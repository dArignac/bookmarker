import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileIdPipe } from '../features/profiles/pipes';
import { NotNullPipe } from '../pipes';
import { ProfileSelectionComponent } from '../features/profiles/components/profile-selection/profile-selection.component';
import { SupabaseService } from '../services/supabase.service';
import { GLOBAL_RX_STATE } from '../state';
@Component({
  selector: 'app-navigation',
  imports: [CommonModule, NotNullPipe, ProfileIdPipe, RouterLink, RouterLinkActive, ProfileSelectionComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy {
  serviceSupabase = inject(SupabaseService);

  globalState = inject(GLOBAL_RX_STATE);
  selectedProfile$ = this.globalState.select('selectedProfile');

  isLoggedIn$ = this.serviceSupabase.isLoggedIn$;

  ngOnInit() {}

  ngOnDestroy() {}

  public async logout(): Promise<void> {
    await this.serviceSupabase.logout();
  }
}
