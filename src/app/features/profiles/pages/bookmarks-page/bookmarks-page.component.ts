import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ToastService } from '@core/services/toast/toast.service';
import { ProfilesService } from '@features/profiles/services/profiles.service';
import { BehaviorSubject, switchMap } from 'rxjs';
import { GLOBAL_RX_STATE } from '../../../../state';
import { BookmarkCreationComponent } from '../../components/bookmark-creation/bookmark-creation.component';
import { BookmarkListComponent } from '../../components/bookmark-list/bookmark-list.component';
import { TagFilterComponent } from '../../components/tag-filter/tag-filter.component';

@Component({
  selector: 'app-bookmarks-page',
  imports: [BookmarkListComponent, BookmarkCreationComponent, CommonModule, TagFilterComponent],
  templateUrl: './bookmarks-page.component.html',
  styleUrl: './bookmarks-page.component.scss',
})
export class BookmarksPageComponent {
  // BehaviourSubject to react on changes of profileId
  private profileIdSubject = new BehaviorSubject<string>('');

  @Input()
  set profileId(value: string) {
    this.profileIdSubject.next(value);
    const success = this.serviceProfiles.setSelectedProfile(value);
    if (!success) {
      this.serviceToast.showToast('Unable to set profile!', 'error');
    }
  }
  get profileId(): string {
    return this.profileIdSubject.value;
  }

  serviceProfiles = inject(ProfilesService);
  serviceToast = inject(ToastService);

  globalState = inject(GLOBAL_RX_STATE);

  bookmarks$ = this.profileIdSubject.pipe(switchMap((id) => this.globalState.select('bookmarks', id)));
}
