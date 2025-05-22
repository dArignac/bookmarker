import { InjectionToken } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Profile } from './types';

export interface GlobalState {
  selectedProject: Profile | null;
  profiles: Profile[] | null;
}

export const GLOBAL_RX_STATE = new InjectionToken<RxState<GlobalState>>('GLOBAL_RX_STATE');
