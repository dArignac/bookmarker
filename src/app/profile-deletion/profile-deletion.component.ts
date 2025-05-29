import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProfilesService } from '../profiles.service';
import { GLOBAL_RX_STATE } from '../state';
import { ToastService } from '../toast.service';
import { Profile } from '../types';

@Component({
  selector: 'app-profile-deletion',
  imports: [RouterModule],
  templateUrl: './profile-deletion.component.html',
  styleUrl: './profile-deletion.component.scss',
})
export class ProfileDeletionComponent implements OnInit {
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
