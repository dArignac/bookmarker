import { Component, inject, Input } from '@angular/core';
import { ProfilesService } from '../profiles.service';
import { GLOBAL_RX_STATE } from '../state';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-bookmarks',
  imports: [],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
})
export class BookmarksComponent {
  @Input()
  set profileId(value: string) {
    const success = this.serviceProfiles.setSelectedProfile(value);
    if (!success) {
      this.serviceToast.showToast('Unable to set profile!', 'error');
    }
  }

  serviceProfiles = inject(ProfilesService);
  serviceToast = inject(ToastService);

  globalState = inject(GLOBAL_RX_STATE);

  // FIXME necessary?
  // user: User = this.activatedRoute.snapshot.data['user'];

  // bookmarksResource = resource({
  //   loader: () => firstValueFrom(this.serviceApi.getBookmarks()),
  // });
}
