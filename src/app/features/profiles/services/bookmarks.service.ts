import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '@core/services/supabase/supabase.service';
import { Profile } from '@features/profiles/models/Profile';
import { PostgrestError, RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { produce } from 'immer';
import { GLOBAL_RX_STATE } from '../../../state';
import { Bookmark } from '../models/Bookmark';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  serviceSupabase = inject(SupabaseService);

  globalState = inject(GLOBAL_RX_STATE);

  bookmarkChangesRealtimeChannel: RealtimeChannel | null = null;

  // FIXME seems to not get updates, either impl error or permissions
  initializeRealtimeChannels(profileId: string) {
    if (!this.bookmarkChangesRealtimeChannel) {
      this.bookmarkChangesRealtimeChannel = this.serviceSupabase.instance
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            schema: 'public', // Subscribes to the "public" schema in Postgres
            event: '*', // Listen to all changes
            table: 'bookmarks', // Listen to profile table only
            // filter: `profile_id=eq.${profileId}`, // Filter for the specific profile
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
    console.warn('Bookmarks Realtime update received:', payload);

    // if (payload.eventType === 'DELETE') {
    //   this.globalState.set((state) =>
    //     produce(state, (draft) => {
    //       const index = draft.profiles!.findIndex((profile: Profile) => profile.id === payload.old['id']);
    //       if (index !== -1) draft.profiles!.splice(index, 1);
    //     })
    //   );
    // } else if (payload.eventType === 'UPDATE') {
    //   this.globalState.set((state) =>
    //     produce(state, (draft) => {
    //       const index = draft.profiles!.findIndex((profile: Profile) => profile.id === payload.new['id']);
    //       if (index !== -1) {
    //         draft.profiles![index] = { id: payload.new['id'], name: payload.new['name'] as string } as Profile;
    //       }
    //     })
    //   );
    // } else if (payload.eventType === 'INSERT') {
    //   this.globalState.set((state) =>
    //     produce(state, (draft) => {
    //       const newProfile: Profile = {
    //         id: payload.new['id'],
    //         name: payload.new['name'],
    //       };
    //       draft.profiles!.push(newProfile);
    //     })
    //   );
    // }
  }

  async loadBookmarks(profileId: string): Promise<boolean> {
    const user = await this.serviceSupabase.getUser();

    const { data, error }: { data: Bookmark[] | null; error: PostgrestError | null } = await this.serviceSupabase.instance
      .from('bookmarks')
      .select('id,created_at,url,title,profile_id')
      .eq('profile_id', profileId)
      .eq('user_id', user.data.user?.id)
      .order('created_at', { ascending: false });

    if (error === null) {
      // FIXME remove
      console.warn('Bookmarks loaded successfully:', data);
      this.globalState.set((state) =>
        produce(state, (draft) => {
          if (draft.bookmarks === undefined) {
            draft.bookmarks = {};
          }
          draft.bookmarks[profileId] = data ?? [];
          draft.errors.bookmarks.loading = null;
        })
      );

      return true;
    } else {
      this.globalState.set((state) =>
        produce(state, (draft) => {
          draft.bookmarks[profileId] = [];
          draft.errors.bookmarks.loading = error.message;
        })
      );

      return false;
    }
  }

  // setSelectedProfile(profileId: string): boolean {
  //   const profiles = this.globalState.get('profiles');
  //   const selectedProfile = profiles?.find((profile) => profile.id === profileId) || null;

  //   if (selectedProfile === null) {
  //     // error case, toast is handled by calling component
  //     return false;
  //   }

  //   // success case, set the selected profile
  //   this.globalState.set((state) =>
  //     produce(state, (draft) => {
  //       draft.selectedProfile = selectedProfile;
  //     })
  //   );

  //   return true;
  // }

  // async deleteProfile(profileId: string): Promise<boolean> {
  //   const response = await this.serviceSupabase.instance.from('profiles').delete().eq('id', profileId);
  //   return response.error === null;
  // }
}
