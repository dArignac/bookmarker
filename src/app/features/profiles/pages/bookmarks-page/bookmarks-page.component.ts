import { Component, inject, Input } from '@angular/core';
import { ToastService } from '@core/services/toast/toast.service';
import { ProfilesService } from '@features/profiles/services/profiles.service';
import { GLOBAL_RX_STATE } from '../../../../state';

@Component({
  selector: 'app-bookmarks-page',
  imports: [],
  templateUrl: './bookmarks-page.component.html',
  styleUrl: './bookmarks-page.component.scss',
})
export class BookmarksPageComponent {
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
