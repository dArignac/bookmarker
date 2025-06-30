import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BookmarksService } from './services/bookmarks.service';

@Injectable({ providedIn: 'root' })
export class BookmarksResolver implements Resolve<Promise<boolean>> {
  private serviceBookmarks = inject(BookmarksService);

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ('profileId' in route.params) {
      const success = await this.serviceBookmarks.loadBookmarks(route.params['profileId']);
      if (!success) {
        throw new Error('Failed to load bookmarks');
      }
      this.serviceBookmarks.initializeRealtimeChannels(route.params['profileId']);
      return true;
    } else {
      throw new Error('Failed to resolve bookmarks');
    }
  }
}
