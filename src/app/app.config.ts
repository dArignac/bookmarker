import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { rxState } from '@rx-angular/state';
import { routes } from './app.routes';
import { GLOBAL_RX_STATE, GlobalState } from './state';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: GLOBAL_RX_STATE,
      useFactory: () => rxState<GlobalState>(),
    },
  ],
};
