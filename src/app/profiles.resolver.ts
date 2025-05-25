import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProfilesService } from './profiles.service';

@Injectable({ providedIn: 'root' })
export class ProfilesResolver implements Resolve<Promise<boolean>> {
  private serviceProfiles = inject(ProfilesService);

  constructor() {}
  async resolve() {
    const success = await this.serviceProfiles.loadProfiles();
    if (!success) {
      throw new Error('Failed to load profiles');
    }
    this.serviceProfiles.initializeRealtimeChannels();
    return success;
  }
}
