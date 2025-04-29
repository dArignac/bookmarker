import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PostgrestError, RealtimeChannel } from '@supabase/supabase-js';
import { ProfileCreationComponent } from '../profile-creation/profile-creation.component';
import { SupabaseService } from '../supabase.service';
import { ToastService } from '../toast.service';
import { Profile } from '../types';

@Component({
  selector: 'app-profiles',
  imports: [CommonModule, ProfileCreationComponent],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss',
})
export class ProfilesComponent implements OnInit, OnDestroy {
  sbService = inject(SupabaseService);
  toastService = inject(ToastService);
  cdr = inject(ChangeDetectorRef);

  private _profiles: Profile[] = [];

  get profiles(): Profile[] {
    return this._profiles;
  }

  selectedProfileId = '';

  profileChangesRealtimeChannel: RealtimeChannel;

  constructor() {
    this.profileChangesRealtimeChannel = this.sbService.instance
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          schema: 'public', // Subscribes to the "public" schema in Postgres
          event: '*', // Listen to all changes
          table: 'profiles', // Listen to profile table only
        },
        (payload) => this.loadProfiles()
      )
      .subscribe();
  }

  async ngOnInit(): Promise<void> {
    await this.loadProfiles();
  }

  ngOnDestroy(): void {
    this.profileChangesRealtimeChannel.unsubscribe();
  }

  async loadProfiles() {
    const { data, error }: { data: Profile[] | null; error: PostgrestError | null } = await this.sbService.instance.from('profiles').select('id,name').order('name', { ascending: true });
    if (error === null) {
      if (data !== null) {
        this._profiles = data;
        this.cdr.detectChanges(); // Trigger change detection
      } else {
        this.toastService.showToast('No profile data was returned.', 'info');
      }
    } else {
      this.toastService.showToast(error!.message, 'error');
    }
  }

  selectProfileForEdit(profileId: string) {
    this.selectedProfileId = profileId;
  }
}
