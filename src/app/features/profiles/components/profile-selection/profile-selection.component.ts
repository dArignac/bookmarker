import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GLOBAL_RX_STATE } from '../../../../state';
import { ProfileIdPipe } from '../../pipes';
import { ProfilesService } from '../../services/profiles.service';

@Component({
  selector: 'app-profile-selection',
  imports: [CommonModule, FormsModule, ProfileIdPipe],
  templateUrl: './profile-selection.component.html',
  styleUrl: './profile-selection.component.scss',
})
export class ProfileSelectionComponent {
  // FIXME if the URl contains an invalid profileId, we must redirect to landing page and show toast
  serviceProfiles = inject(ProfilesService);
  router = inject(Router);

  globalState = inject(GLOBAL_RX_STATE);
  readonly profiles$ = this.globalState.select('profiles');
  // note that this value is set by the components that get the profileId url parameter
  readonly selectedProfile$ = this.globalState.select('selectedProfile');

  onProfileChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.router.navigate(['/profiles', value, 'bookmarks']);
  }
}
