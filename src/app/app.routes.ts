import { Routes } from '@angular/router';
import { AuthRedirectGuard } from './auth-redirect.guard';
import { AuthGuard } from './auth.guard';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { UuidRouteGuard } from './guards/uuid-route.guard';
import { HomeComponent } from './home/home.component';
import { LoginRequiredComponent } from './login-required/login-required.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
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
    path: 'profiles/:profileId/delete',
    component: ProfileDeletionComponent,
    canActivate: [AuthGuard, UuidRouteGuard],
    resolve: {
      user: UserResolver,
      profiles: ProfilesResolver,
    },
  },
  {
    path: 'profiles/:profileId/bookmarks',
    component: BookmarksComponent,
    canActivate: [AuthGuard, UuidRouteGuard],
    resolve: {
      user: UserResolver,
      profiles: ProfilesResolver,
    },
  },
  {
    path: 'profiles/:profileId/tags',
    component: TagsComponent,
    canActivate: [AuthGuard, UuidRouteGuard],
    resolve: {
      user: UserResolver,
      profiles: ProfilesResolver,
    },
  },
  { path: 'login', component: LoginComponent },
  { path: 'not-logged-in', component: LoginRequiredComponent },
  { path: 'error', component: ErrorComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
