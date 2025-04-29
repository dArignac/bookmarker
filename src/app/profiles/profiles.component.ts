import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PostgrestError } from '@supabase/supabase-js';
import { ProfileCreationComponent } from '../profile-creation/profile-creation.component';
import { SupabaseService } from '../supabase.service';
import { ToastService } from '../toast.service';
import { Profile } from '../types';

@Component({
  selector: 'app-profiles',
  imports: [ProfileCreationComponent],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss',
})
export class ProfilesComponent implements OnInit {
  sbService = inject(SupabaseService);
  toastService = inject(ToastService);
  cdr = inject(ChangeDetectorRef);

  private _profiles: Profile[] = [];

  get profiles(): Profile[] {
    return this._profiles;
  }

  selectedProfileId = '';

  // FIXME should auto update with supabase events or so
  async ngOnInit(): Promise<void> {
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

  selectProfileForEdit(prodileId: string) {
    this.selectedProfileId = prodileId;
  }
}
