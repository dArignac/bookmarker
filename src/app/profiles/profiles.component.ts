import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProfileCreationComponent } from '../profile-creation/profile-creation.component';
import { GLOBAL_RX_STATE } from '../state';

@Component({
  selector: 'app-profiles',
  imports: [CommonModule, ProfileCreationComponent],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss',
})
export class ProfilesComponent {
  globalState = inject(GLOBAL_RX_STATE);
  readonly profiles$ = this.globalState.select('profiles');

  selectedProfileId = '';

  selectProfileForEdit(profileId: string) {
    this.selectedProfileId = profileId;
  }
}
