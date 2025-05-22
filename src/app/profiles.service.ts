import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, dematerialize } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { Profile } from './types';
import { PostgrestError } from '@supabase/supabase-js';

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

  // TODO need to connect to the event stream to manipulate the state when profiles have been added, removed or changed
  async loadProfiles() {
    const { data, error }: { data: Profile[] | null; error: PostgrestError | null } = await this.sbService.instance.from('profiles').select('id,name').order('name', { ascending: true });
    return { data, error };
  }
}
