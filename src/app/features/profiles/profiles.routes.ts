import { Routes } from '@angular/router';
import { BookmarksComponent } from '../../bookmarks/bookmarks.component';
import { AuthGuard } from '../../guards/auth.guard';
import { UuidRouteGuard } from '../../guards/uuid-route.guard';
import { ProfilesResolver } from './profiles.resolver';
import { UserResolver } from '../../user.resolver';
import { ProfileDeletionPageComponent } from './pages/profile-deletion-page/profile-deletion-page.component';
import { ProfilesPageComponent } from './pages/profile-page/profiles-page.component';

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
    component: BookmarksComponent,
    canActivate: [AuthGuard, UuidRouteGuard],
    resolve: {
      user: UserResolver,
      profiles: ProfilesResolver,
    },
  },
];
