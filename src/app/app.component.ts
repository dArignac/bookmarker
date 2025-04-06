import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { SupabaseService } from './supabase.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, NavigationComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  // supabase = inject(SupabaseService);
  title = 'Bookmarker';
  // session = this.supabase.session;

  ngOnInit() {
    // this.supabase.authChanges((_, session) => (this.session = session));
  }
}
