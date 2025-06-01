import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SupabaseService } from '../services/supabase/supabase.service';

export const authRedirectGuard: CanActivateFn = (): Observable<boolean> => {
  const router = inject(Router);
  const serviceSupabase = inject(SupabaseService);

  return new Observable<boolean>((observer) => {
    serviceSupabase.getUser().then(({ data }) => {
      router.navigate([data.user ? '/dashboard' : '/home']);
      observer.next(false);
      observer.complete();
    });
  });
};
