import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { Profile } from './types';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  sbService = inject(SupabaseService);

  selectedProfile = signal<Profile | null>(null);

  private hasProfileChanged = new BehaviorSubject<boolean>(false);
  hasProfileChanged$ = this.hasProfileChanged.asObservable(); // FIXME use to react in the app when the profile was switched

  // TODO do we need it?
  getCurrentProfile(): Profile | null {
    return this.selectedProfile();
  }

  // TODO do we need it?
  setCurrentProfile(profile: Profile) {
    this.selectedProfile.set(profile);
  }
}
