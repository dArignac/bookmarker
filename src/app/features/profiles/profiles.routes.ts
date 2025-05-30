import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { UuidRouteGuard } from '../../shared/guards/uuid-route.guard';
import { UserResolver } from '../../user.resolver';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';
import { ProfileDeletionPageComponent } from './pages/profile-deletion-page/profile-deletion-page.component';
import { ProfilesPageComponent } from './pages/profile-page/profiles-page.component';
import { ProfilesResolver } from './profiles.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ProfilesPageComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver,
      profiles: ProfilesResolver,
    },
  },
  {
    path: ':profileId/delete',
    component: ProfileDeletionPageComponent,
    canActivate: [AuthGuard, UuidRouteGuard],
    resolve: {
      user: UserResolver,
      profiles: ProfilesResolver,
    },
  },
  {
    path: ':profileId/bookmarks',
    component: BookmarksPageComponent,
    canActivate: [AuthGuard, UuidRouteGuard],
    resolve: {
      user: UserResolver,
      profiles: ProfilesResolver,
    },
  },
];
