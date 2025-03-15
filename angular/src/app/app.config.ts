import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => {
    //   const auth = getAuth();
    //   // FIXME do we need it?
    //   // connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    //   return auth;
    // }),
  ],
};
