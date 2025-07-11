import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '@core/services/supabase/supabase.service';
import { Profile } from '@features/profiles/models/Profile';
import { PostgrestError, RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { produce } from 'immer';
import { GLOBAL_RX_STATE } from '../../../state';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  serviceSupabase = inject(SupabaseService);

  globalState = inject(GLOBAL_RX_STATE);

  profileChangesRealtimeChannel: RealtimeChannel | null = null;

  selectedProfile = signal<Profile | null>(null);

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
            // FIXME is missing a "filter"
          },
          (payload) => this.realtimeUpdate(payload)
        )
        .subscribe();
    }
  }

  async realtimeUpdate(
    payload: RealtimePostgresChangesPayload<{
      [key: string]: any;
    }>
  ) {
    console.warn('Profiles Realtime update received:', payload);

    if (payload.eventType === 'DELETE') {
      this.globalState.set((state) =>
        produce(state, (draft) => {
          const index = draft.profiles!.findIndex((profile: Profile) => profile.id === payload.old['id']);
          if (index !== -1) draft.profiles!.splice(index, 1);
        })
      );
    } else if (payload.eventType === 'UPDATE') {
      this.globalState.set((state) =>
        produce(state, (draft) => {
          const index = draft.profiles!.findIndex((profile: Profile) => profile.id === payload.new['id']);
          if (index !== -1) {
            draft.profiles![index] = { id: payload.new['id'], name: payload.new['name'] as string } as Profile;
          }
        })
      );
    } else if (payload.eventType === 'INSERT') {
      this.globalState.set((state) =>
        produce(state, (draft) => {
          const newProfile: Profile = {
            id: payload.new['id'],
            name: payload.new['name'],
          };
          draft.profiles!.push(newProfile);
        })
      );
    }
  }

  async loadProfiles(): Promise<boolean> {
    const user = await this.serviceSupabase.getUser();

    const { data, error }: { data: Profile[] | null; error: PostgrestError | null } = await this.serviceSupabase.instance
      .from('profiles')
      .select('id,name')
      .eq('user_id', user.data.user?.id)
      .order('name', { ascending: true });

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

  setSelectedProfile(profileId: string): boolean {
    const profiles = this.globalState.get('profiles');
    const selectedProfile = profiles?.find((profile) => profile.id === profileId) || null;

    if (selectedProfile === null) {
      // error case, toast is handled by calling component
      return false;
    }

    // success case, set the selected profile
    this.globalState.set((state) =>
      produce(state, (draft) => {
        draft.selectedProfile = selectedProfile;
      })
    );

    return true;
  }

  async deleteProfile(profileId: string): Promise<boolean> {
    const user = await this.serviceSupabase.getUser();
    const response = await this.serviceSupabase.instance.from('profiles').delete().eq('id', profileId).eq('user_id', user.data.user?.id);
    return response.error === null;
  }
}
