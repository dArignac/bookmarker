import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthRedirectGuard implements CanActivate {
  router = inject(Router);

  serviceSupabase = inject(SupabaseService);

  canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.serviceSupabase.getUser().then(({ data }) => {
        this.router.navigate([data.user ? '/dashboard' : '/home']);
        observer.next(false);
        observer.complete();
      });
    });
  }
}
