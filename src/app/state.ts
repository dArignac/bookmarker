import { InjectionToken } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Profile } from './features/profiles/models/Profile';

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
