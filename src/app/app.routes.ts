import { Routes } from '@angular/router';
import { AuthRedirectGuard } from './auth-redirect.guard';
import { AuthGuard } from './auth.guard';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginRequiredComponent } from './login-required/login-required.component';
import { LoginComponent } from './login/login.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { ProfileDeletionComponent } from './profile-deletion/profile-deletion.component';
import { ProfilesResolver } from './profiles.resolver';
import { ProfilesComponent } from './profiles/profiles.component';
import { TagsComponent } from './tags/tags.component';
import { UserResolver } from './user.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthRedirectGuard],
    component: PlaceholderComponent, // Won't be shown
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver,
      profiles: ProfilesResolver,
    },
  },
  {
    path: 'profiles',
    component: ProfilesComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver,
      profiles: ProfilesResolver,
    },
  },
  {
    // FIXME can we add a guard to ensure the id is a UUID? If not handle in component
    path: 'profiles/:profileId/delete',
    component: ProfileDeletionComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver,
      profiles: ProfilesResolver,
    },
  },
  {
    // FIXME can we add a guard to ensure the id is a UUID? If not handle in component
    path: 'profiles/:profileId/bookmarks',
    component: BookmarksComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver,
      profiles: ProfilesResolver,
    },
  },
  {
    // FIXME can we add a guard to ensure the id is a UUID? If not handle in component
    path: 'profiles/:profileId/tags',
    component: TagsComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver,
      profiles: ProfilesResolver,
    },
  },
  { path: 'login', component: LoginComponent },
  { path: 'not-logged-in', component: LoginRequiredComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' },
];
