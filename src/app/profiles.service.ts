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
          // FIXME we could merge the returned data with the state instead if reloading the profiles
          (payload) => this.loadProfiles()
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

  async loadProfiles(): Promise<boolean> {
    const { data, error }: { data: Profile[] | null; error: PostgrestError | null } = await this.serviceSupabase.instance.from('profiles').select('id,name').order('name', { ascending: true });

    if (error === null) {
      this.globalState.set({ profiles: data, errors: { profiles: { loading: null } } });
      return true;
    } else {
      this.globalState.set({ profiles: [], selectedProfile: null, errors: { profiles: { loading: error.message } } });
      return false;
    }
  }
}
