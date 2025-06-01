import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { UuidRouteGuard } from '../../shared/guards/uuid-route.guard';
import { UserResolver } from '../../core/user.resolver';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';
import { ProfileDeletionPageComponent } from './pages/profile-deletion-page/profile-deletion-page.component';
import { ProfilesPageComponent } from './pages/profile-page/profiles-page.component';
import { ProfilesResolver } from './profiles.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ProfilesPageComponent,
    canActivate: [authGuard],
    resolve: {
      user: UserResolver,
      profiles: ProfilesResolver,
    },
  },
  {
    path: ':profileId/delete',
    component: ProfileDeletionPageComponent,
    canActivate: [authGuard, UuidRouteGuard],
    resolve: {
      user: UserResolver,
      profiles: ProfilesResolver,
    },
  },
  {
    path: ':profileId/bookmarks',
    component: BookmarksPageComponent,
    canActivate: [authGuard, UuidRouteGuard],
    resolve: {
      user: UserResolver,
      profiles: ProfilesResolver,
    },
  },
];
