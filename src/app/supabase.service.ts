import { inject, Injectable } from '@angular/core';
import { AuthSession, createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  router = inject(Router);
  _session: AuthSession | null = null;
  _user: User | null = null;

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session != null) {
        this._session = session;

        if (event === 'INITIAL_SESSION') {
          // handle initial session
        } else if (event === 'SIGNED_IN') {
          // handle sign in event
          this.isLoggedInSubject.next(true);
        } else if (event === 'SIGNED_OUT') {
          // handle sign out event
          this.isLoggedInSubject.next(false);
        } else if (event === 'PASSWORD_RECOVERY') {
          // handle password recovery event
        } else if (event === 'TOKEN_REFRESHED') {
          // handle token refreshed event
        } else if (event === 'USER_UPDATED') {
          // handle user updated event
        }
      } else {
        console.log('No session.');
      }
    });
  }

  // get session() {
  //   this.supabase.auth.getSession().then(({ data }) => {
  //     this._session = data.session;
  //     console.warn('get session', this._session);
  //   });
  //   return this._session;
  // }

  get user() {
    this.supabase.auth.getUser().then(({ data }) => {
      if (data.user == null) {
        this.isLoggedInSubject.next(false);
      } else {
        this._user = data.user;
      }
    });
    return this._user;
  }

  /**
   * This is needed to be able to check for the user in the AuthGuard.
   * @returns { data: { user: User | null }, error: Error | null }
   */
  async getUser() {
    return await this.supabase.auth.getUser();
  }

  async loginWithEmail(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error != null) {
      // FIXME handle error
      console.error(error);
    } else {
      this._session = data.session;
      this._user = data.user;
      this.router.navigate(['/']);
    }
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();
    if (error != null) {
      // FIXME handle error
      console.error(error);
    } else {
      this.isLoggedInSubject.next(false);
      this._session = null;
      this._user = null;
      this.router.navigate(['/']);
    }
  }

  // authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
  //   return this.supabase.auth.onAuthStateChange(callback);
  // }
}
