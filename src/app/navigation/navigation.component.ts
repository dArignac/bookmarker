import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileSelectionComponent } from '../profile-selection/profile-selection.component';
import { SupabaseService } from '../supabase.service';
@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterLink, RouterLinkActive, ProfileSelectionComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy {
  sbService = inject(SupabaseService);
  isLoggedIn$ = this.sbService.isLoggedIn$;

  ngOnInit() {}

  ngOnDestroy() {}

  public async logout(): Promise<void> {
    await this.sbService.logout();
  }
}
