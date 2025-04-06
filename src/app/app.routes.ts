import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { HomeComponent } from './home/home.component';
import { LoginRequiredComponent } from './login-required/login-required.component';
import { LoginComponent } from './login/login.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { TagsComponent } from './tags/tags.component';
import { UserResolver } from './user.resolver';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'profiles',
    component: ProfilesComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: 'bookmarks',
    component: BookmarksComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: 'tags',
    component: TagsComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver,
    },
  },
  { path: 'login', component: LoginComponent },
  { path: 'not-logged-in', component: LoginRequiredComponent },
];
