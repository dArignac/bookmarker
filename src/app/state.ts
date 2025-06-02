import { InjectionToken } from '@angular/core';
import { Profile } from '@features/profiles/models/Profile';
import { RxState } from '@rx-angular/state';

export interface GlobalState {
  selectedProfile: Profile | null;
  profiles: Profile[] | null;

  errors: {
    profiles: {
      loading: string | null;
      selected: string | null;
    };
  };
}

export const GLOBAL_RX_STATE = new InjectionToken<RxState<GlobalState>>('GLOBAL_RX_STATE');
