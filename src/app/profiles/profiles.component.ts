import { Component, inject, OnInit } from '@angular/core';
import { ProfileCreationComponent } from '../profile-creation/profile-creation.component';
import { SupabaseService } from '../supabase.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-profiles',
  imports: [ProfileCreationComponent],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss',
})
export class ProfilesComponent implements OnInit {
  sbService = inject(SupabaseService);
  toastService = inject(ToastService);

  async ngOnInit(): Promise<void> {
    // FIXME hwo to type this?
    const { data, error } = await this.sbService.instance.from('profiles').select();
    if (error == null) {
      // FIXME handle
    } else {
      this.toastService.showToast(error.message, 'error');
    }
  }
}
