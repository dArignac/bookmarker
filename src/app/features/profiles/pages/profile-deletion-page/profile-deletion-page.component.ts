import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
import { GLOBAL_RX_STATE } from '../../../../state';
import { Profile } from '../../models/Profile';
import { ProfilesService } from '../../services/profiles.service';

@Component({
  selector: 'app-profile-deletion-page',
  imports: [RouterModule],
  templateUrl: './profile-deletion-page.component.html',
  styleUrl: './profile-deletion-page.component.scss',
})
export class ProfileDeletionPageComponent implements OnInit {
  @Input() profileId: string = '';

  router = inject(Router);

  serviceProfiles = inject(ProfilesService);
  serviceToast = inject(ToastService);

  globalState = inject(GLOBAL_RX_STATE);
  readonly profiles = this.globalState.get('profiles');

  profile: Profile | undefined;

  ngOnInit(): void {
    if (this.profileId.length > 0) {
      this.profile = this.profiles!.find((p) => p.id === this.profileId);
    }
  }

  async deleteProfile() {
    if (this.profile) {
      console.warn('Deleting profile:', this.profile);
      const success = await this.serviceProfiles.deleteProfile(this.profile.id);
      console.warn('Profile deletion success:', success);
      if (!success) {
        this.serviceToast.showToast('Unable to delete profile!', 'error');
      } else {
        this.router.navigate(['/profiles']);
      }
    }
  }
}
