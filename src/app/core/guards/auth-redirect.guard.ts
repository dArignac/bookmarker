import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '@core/services/supabase/supabase.service';
import { Observable } from 'rxjs';

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
