import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GLOBAL_RX_STATE } from '../../../../state';
import { ProfileCreationComponent } from '../../components/profile-creation/profile-creation.component';

@Component({
  selector: 'app-profiles-page',
  imports: [CommonModule, RouterModule, ProfileCreationComponent],
  templateUrl: './profiles-page.component.html',
  styleUrl: './profiles-page.component.scss',
})
export class ProfilesPageComponent {
  globalState = inject(GLOBAL_RX_STATE);
  readonly profiles$ = this.globalState.select('profiles');

  selectedProfileId = '';

  selectProfileForEdit(profileId: string) {
    this.selectedProfileId = profileId;
  }
}
