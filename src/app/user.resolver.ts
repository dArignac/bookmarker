import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

// FIXME really needed
@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<User | null> {
  supabase = inject(SupabaseService);

  resolve(): User | null {
    return this.supabase.user;
  }
}
