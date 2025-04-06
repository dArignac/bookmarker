import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterLink, RouterLinkActive],
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
