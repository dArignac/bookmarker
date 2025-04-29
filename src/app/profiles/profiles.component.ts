import { Component, inject, OnInit } from '@angular/core';
import { ProfileCreationComponent } from '../profile-creation/profile-creation.component';
import { SupabaseService } from '../supabase.service';
import { ToastService } from '../toast.service';
import { Tables } from '../database.types';
import { PostgrestError } from '@supabase/supabase-js';

@Component({
  selector: 'app-profiles',
  imports: [ProfileCreationComponent],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss',
})
export class ProfilesComponent implements OnInit {
  sbService = inject(SupabaseService);
  toastService = inject(ToastService);

  profiles: Tables<'profiles'>[] = [];

  async ngOnInit(): Promise<void> {
    const { data, error }: { data: Tables<'profiles'>[] | null; error: PostgrestError | null } = await this.sbService.instance.from('profiles').select();
    if (error == null && data != null) {
      this.profiles = data;
    } else {
      this.toastService.showToast(error!.message, 'error');
    }
  }
}
