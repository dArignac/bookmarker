import { Component, inject } from '@angular/core';
import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-profile-selection',
  imports: [],
  templateUrl: './profile-selection.component.html',
  styleUrl: './profile-selection.component.scss',
})
export class ProfileSelectionComponent {
  profileService = inject(ProfilesService);

  // FIXME component needs to handle the data loading
}
