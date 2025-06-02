import { Component, computed, inject, Input, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '@core/services/toast/toast.service';
import { Profile } from '@features/profiles/models/Profile';
import { ProfilesService } from '@features/profiles/services/profiles.service';
import { GLOBAL_RX_STATE } from '../../../../state';

@Component({
  selector: 'app-profile-deletion-page',
  imports: [RouterModule],
  templateUrl: './profile-deletion-page.component.html',
  styleUrl: './profile-deletion-page.component.scss',
})
export class ProfileDeletionPageComponent {
  @Input() profileId: string = '';

  router = inject(Router);

  serviceProfiles = inject(ProfilesService);
  serviceToast = inject(ToastService);

  globalState = inject(GLOBAL_RX_STATE);
  readonly profiles = this.globalState.get('profiles');

  profile: Signal<Profile | undefined> = computed(() => (this.profileId.length > 0 ? this.profiles!.find((p) => p.id === this.profileId) : undefined));

  async deleteProfile() {
    if (this.profile) {
      const success = await this.serviceProfiles.deleteProfile(this.profile()!.id);
      if (!success) {
        this.serviceToast.showToast('Unable to delete profile!', 'error');
      } else {
        this.router.navigate(['/profiles']);
      }
    }
  }
}
