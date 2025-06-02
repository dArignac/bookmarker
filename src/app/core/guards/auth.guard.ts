import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '@core/services/supabase/supabase.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const serviceSupabase = inject(SupabaseService);
  const router = inject(Router);

  return new Observable<boolean>((observer) => {
    serviceSupabase.getUser().then(({ data }) => {
      if (data.user) {
        observer.next(true);
      } else {
        router.navigate(['/login']);
        observer.next(false);
      }
      observer.complete();
    });
  });
};
