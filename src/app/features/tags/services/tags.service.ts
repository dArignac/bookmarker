import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '@core/services/supabase/supabase.service';
import { Profile } from '@features/profiles/models/Profile';
import { PostgrestError, RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { produce } from 'immer';
import { GLOBAL_RX_STATE } from '../../../state';
import { Tag } from '../models/Tag';
import { T } from 'vitest/dist/chunks/reporters.d.BFLkQcL6.js';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
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
            table: 'tags', // Listen to profile table only
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
    console.warn('Tags Realtime update received:', payload);
    if (payload.eventType === 'DELETE') {
      this.globalState.set((state) =>
        produce(state, (draft) => {
          const index = draft.tags!.findIndex((tag: Tag) => tag.id === payload.old['id']);
          if (index !== -1) draft.tags!.splice(index, 1);
        })
      );
    } else if (payload.eventType === 'UPDATE') {
      this.globalState.set((state) =>
        produce(state, (draft) => {
          const index = draft.tags!.findIndex((tag: Tag) => tag.id === payload.new['id']);
          if (index !== -1) {
            draft.tags![index] = { id: payload.new['id'], name: payload.new['name'] as string } as Tag;
          }
        })
      );
    } else if (payload.eventType === 'INSERT') {
      this.globalState.set((state) =>
        produce(state, (draft) => {
          const newTag: Tag = {
            created_at: payload.new['created_at'],
            id: payload.new['id'],
            name: payload.new['name'],
            user_id: payload.new['user_id'],
          };
          draft.tags!.push(newTag);
        })
      );
    }
  }

  async loadTags(): Promise<boolean> {
    const user = await this.serviceSupabase.getUser();

    const { data, error }: { data: Tag[] | null; error: PostgrestError | null } = await this.serviceSupabase.instance
      .from('tags')
      .select('id,name,created_at,user_id')
      .eq('user_id', user.data.user?.id)
      .order('name', { ascending: true });

    if (error === null) {
      this.globalState.set((state) =>
        produce(state, (draft) => {
          draft.tags = data ?? [];
          draft.errors.tags.loading = null;
        })
      );

      return true;
    } else {
      this.globalState.set((state) =>
        produce(state, (draft) => {
          draft.tags = [];
          draft.errors.tags.loading = error.message;
        })
      );

      return false;
    }
  }

  //   setSelectedProfile(profileId: string): boolean {
  //     const profiles = this.globalState.get('profiles');
  //     const selectedProfile = profiles?.find((profile) => profile.id === profileId) || null;

  //     if (selectedProfile === null) {
  //       // error case, toast is handled by calling component
  //       return false;
  //     }

  //     // success case, set the selected profile
  //     this.globalState.set((state) =>
  //       produce(state, (draft) => {
  //         draft.selectedProfile = selectedProfile;
  //       })
  //     );

  //     return true;
  //   }

  //   async deleteProfile(profileId: string): Promise<boolean> {
  //     const user = await this.serviceSupabase.getUser();
  //     const response = await this.serviceSupabase.instance.from('profiles').delete().eq('id', profileId).eq('user_id', user.data.user?.id);
  //     return response.error === null;
  //   }
}
