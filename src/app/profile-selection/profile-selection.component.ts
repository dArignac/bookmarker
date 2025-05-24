import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GLOBAL_RX_STATE } from '../state';

@Component({
  selector: 'app-profile-selection',
  imports: [CommonModule],
  templateUrl: './profile-selection.component.html',
  styleUrl: './profile-selection.component.scss',
})
export class ProfileSelectionComponent {
  globalState = inject(GLOBAL_RX_STATE);
  readonly profiles$ = this.globalState.select('profiles');

  selectedProfileId = '';
}
