import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { HomeComponent } from './home/home.component';
import { LoginRequiredComponent } from './login-required/login-required.component';
import { TagsComponent } from './tags/tags.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('/not-logged-in');

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'bookmarks',
    component: BookmarksComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    // FIXME
    // resolve: {
    //   user: UserResolver,
    // },
  },
  {
    path: 'tags',
    component: TagsComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    // FIXME
    // resolve: {
    //   user: UserResolver,
    // },
  },
  { path: 'not-logged-in', component: LoginRequiredComponent },
];
