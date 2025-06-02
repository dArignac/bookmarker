import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SupabaseService } from '@core/services/supabase/supabase.service';
import { ProfileSelectionComponent } from '@features/profiles/components/profile-selection/profile-selection.component';
import { ProfileIdPipe } from '@features/profiles/pipes';
import { NotNullPipe } from '@shared/pipes';
import { GLOBAL_RX_STATE } from '../../../state';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, NotNullPipe, ProfileIdPipe, RouterLink, RouterLinkActive, ProfileSelectionComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  serviceSupabase = inject(SupabaseService);

  globalState = inject(GLOBAL_RX_STATE);
  selectedProfile$ = this.globalState.select('selectedProfile');

  isLoggedIn$ = this.serviceSupabase.isLoggedIn$;

  public async logout(): Promise<void> {
    await this.serviceSupabase.logout();
  }
}
