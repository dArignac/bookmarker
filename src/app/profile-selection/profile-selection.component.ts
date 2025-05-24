import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileIdPipe } from '../pipes';
import { ProfilesService } from '../profiles.service';
import { GLOBAL_RX_STATE } from '../state';

@Component({
  selector: 'app-profile-selection',
  imports: [CommonModule, FormsModule, ProfileIdPipe],
  templateUrl: './profile-selection.component.html',
  styleUrl: './profile-selection.component.scss',
})
export class ProfileSelectionComponent {
  serviceProfiles = inject(ProfilesService);
  globalState = inject(GLOBAL_RX_STATE);
  readonly profiles$ = this.globalState.select('profiles');
  readonly selectedProfile$ = this.globalState.select('selectedProfile');

  onProfileChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.serviceProfiles.setSelectedProfile(value);
  }
}
