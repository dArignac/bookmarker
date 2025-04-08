import { Component, inject, OnInit } from '@angular/core';
import { ProfileCreationComponent } from '../profile-creation/profile-creation.component';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-profiles',
  imports: [ProfileCreationComponent],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss',
})
export class ProfilesComponent implements OnInit {
  sbService = inject(SupabaseService);

  async ngOnInit(): Promise<void> {
    const { data, error } = await this.sbService.instance.from('profiles').select();
    console.warn('data', data);
    console.warn('error', error);
  }
}
