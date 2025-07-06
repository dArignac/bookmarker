import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { rxState } from '@rx-angular/state';
import { routes } from './app.routes';
import { GLOBAL_RX_STATE, GlobalState } from './state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    {
      provide: GLOBAL_RX_STATE,
      useFactory: () => {
        const state = rxState<GlobalState>();
        state.set({
          selectedProfile: null,
          profiles: null,
          errors: {
            bookmarks: {
              loading: null,
            },
            profiles: {
              loading: null,
              selected: null,
            },
            tags: {
              loading: null,
            },
          },
        });
        return state;
      },
    },
  ],
};
