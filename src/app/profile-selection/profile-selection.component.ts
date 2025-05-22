import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PostgrestError, RealtimeChannel } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase.service';
import { ToastService } from '../toast.service';
import { Profile } from '../types';

@Component({
  selector: 'app-profile-selection',
  imports: [CommonModule],
  templateUrl: './profile-selection.component.html',
  styleUrl: './profile-selection.component.scss',
})
export class ProfileSelectionComponent implements OnInit, OnDestroy {
  // FIXME need to use a store to hold the data to decouple and better react on changes and only fetch them once! - using the CDR approach does not update the select
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
    //await this.loadProfiles();
  }

  ngOnDestroy(): void {
    this.profileChangesRealtimeChannel.unsubscribe();
  }

  async loadProfiles() {
    const { data, error }: { data: Profile[] | null; error: PostgrestError | null } = await this.sbService.instance.from('profiles').select('id,name').order('name', { ascending: true });
    if (error === null) {
      if (data !== null) {
        this._profiles = data;
        console.log('data is', data);
        this.cdr.detectChanges(); // Trigger change detection
      } else {
        this.toastService.showToast('No profile data was returned.', 'info');
      }
    } else {
      this.toastService.showToast(error!.message, 'error');
    }
  }
}
