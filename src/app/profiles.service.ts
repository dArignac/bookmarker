import { inject, Injectable, signal } from '@angular/core';
import { PostgrestError, RealtimeChannel } from '@supabase/supabase-js';
import { produce } from 'immer';
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

  async loadProfiles(): Promise<boolean> {
    const { data, error }: { data: Profile[] | null; error: PostgrestError | null } = await this.serviceSupabase.instance.from('profiles').select('id,name').order('name', { ascending: true });

    if (error === null) {
      this.globalState.set((state) =>
        produce(state, (draft) => {
          draft.profiles = data ?? [];
          draft.errors.profiles.loading = null;
        })
      );

      return true;
    } else {
      this.globalState.set((state) =>
        produce(state, (draft) => {
          draft.profiles = [];
          draft.errors.profiles.loading = error.message;
        })
      );

      return false;
    }
  }

  // FIXME we don't need it, should be gotten from url
  setSelectedProfile(profileId: string) {
    const profiles = this.globalState.get('profiles');
    const selectedProfile = profiles?.find((profile) => profile.id === profileId) || null;

    if (selectedProfile === null) {
      // error case, handed over if does not exist
      // FIXME use immer
      this.globalState.set((state) => ({
        ...state,
        selectedProfile: null,
        errors: {
          ...state.errors,
          selected: `Profile with ID ${profileId} not found.`,
        },
      }));
    } else {
      // success case, set the selected profile
      // FIXME use immer
      this.globalState.set((state) => ({
        ...state,
        selectedProfile: selectedProfile,
      }));

      // Notify that the profile has changed
      this.hasProfileChanged.next(true);
    }
  }
}
