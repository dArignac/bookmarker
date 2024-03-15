import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<User> {
  authService = inject(AuthService);
  resolve(): Observable<User> {
    return this.authService.user$;
  }
}
