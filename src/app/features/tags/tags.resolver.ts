import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TagsService } from './services/tags.service';

@Injectable({ providedIn: 'root' })
export class TagsResolver implements Resolve<Promise<boolean>> {
  private serviceProfiles = inject(TagsService);

  async resolve() {
    const success = await this.serviceProfiles.loadTags();
    if (!success) {
      throw new Error('Failed to load tags');
    }
    this.serviceProfiles.initializeRealtimeChannels();
    return success;
  }
}
