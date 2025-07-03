import { InjectionToken } from '@angular/core';
import { Bookmark } from '@features/profiles/models/Bookmark';
import { Profile } from '@features/profiles/models/Profile';
import { Tag } from '@features/tags/models/Tag';
import { RxState } from '@rx-angular/state';

export interface GlobalState {
  // profiles are global
  selectedProfile: Profile | null;
  profiles: Profile[] | null;

  // bookmarks belong to a profile, so we use a map where the key is the profileId
  bookmarks: {
    [profileId: string]: Bookmark[];
  };

  // tags are global, not tied to a profile
  tags: Tag[];

  errors: {
    profiles: {
      loading: string | null;
      selected: string | null;
    };
    bookmarks: {
      loading: string | null;
    };
  };
}

export const GLOBAL_RX_STATE = new InjectionToken<RxState<GlobalState>>('GLOBAL_RX_STATE');
