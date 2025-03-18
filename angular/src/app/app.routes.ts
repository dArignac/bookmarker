import { Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { HomeComponent } from './home/home.component';
import { LoginRequiredComponent } from './login-required/login-required.component';
import { TagsComponent } from './tags/tags.component';
import { UserResolver } from './user.resolver';
import { LoginComponent } from './login/login.component';

// TODO check if needed with Supabase
// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('/not-logged-in');

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'bookmarks',
    component: BookmarksComponent,
    // TODO guard
    // canActivate: [AuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: 'tags',
    component: TagsComponent,
    // TODO guard
    // canActivate: [AuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
    resolve: {
      user: UserResolver,
    },
  },
  { path: 'login', component: LoginComponent },
  { path: 'not-logged-in', component: LoginRequiredComponent },
];
