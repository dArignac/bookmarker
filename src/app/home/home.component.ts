import { Component, inject } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  sbService = inject(SupabaseService);
}
