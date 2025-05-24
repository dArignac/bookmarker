import { inject, Injectable, signal } from '@angular/core';
import { PostgrestError, RealtimeChannel } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { GLOBAL_RX_STATE } from './state';
import { SupabaseService } from './supabase.service';
import { Profile } from './types';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  serviceSupabase = inject(SupabaseService);

  globalState = inject(GLOBAL_RX_STATE);

  profileChangesRealtimeChannel: RealtimeChannel | null = null;

  selectedProfile = signal<Profile | null>(null);

  private hasProfileChanged = new BehaviorSubject<boolean>(false);
  hasProfileChanged$ = this.hasProfileChanged.asObservable(); // FIXME use to react in the app when the profile was switched

  initializeRealtimeChannels() {
    if (!this.profileChangesRealtimeChannel) {
      this.profileChangesRealtimeChannel = this.serviceSupabase.instance
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            schema: 'public', // Subscribes to the "public" schema in Postgres
            event: '*', // Listen to all changes
            table: 'profiles', // Listen to profile table only
          },
          (payload) => this.loadProfilesAndSetState()
        )
        .subscribe();
    }
  }

  // TODO do we need it?
  // getCurrentProfile(): Profile | null {
  //   return this.selectedProfile();
  // }

  // TODO do we need it?
  // setCurrentProfile(profile: Profile) {
  //   this.selectedProfile.set(profile);
  // }

  // TODO need to connect to the event stream to manipulate the state when profiles have been added, removed or changed
  async loadProfiles() {
    const { data, error }: { data: Profile[] | null; error: PostgrestError | null } = await this.serviceSupabase.instance.from('profiles').select('id,name').order('name', { ascending: true });
    return { data, error };
  }

  async loadProfilesAndSetState() {
    // TODO handle error case with side effect?
    const result = await this.loadProfiles();
    this.globalState.set({ profiles: result.data });
  }
}
