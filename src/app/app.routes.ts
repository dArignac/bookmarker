import { Routes } from '@angular/router';
import { AuthRedirectGuard } from './core/guards/auth-redirect.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './features/landing-pages/components/dashboard/dashboard.component';
import { HomeComponent } from './features/landing-pages/components/home/home.component';
import { PlaceholderComponent } from './features/landing-pages/components/placeholder/placeholder.component';
import { ProfilesResolver } from './features/profiles/profiles.resolver';
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
    loadChildren: () => import('./features/profiles/profiles.routes').then((m) => m.routes),
  },
  {
    path: 'tags',
    component: TagsComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.routes),
  },
  { path: 'error', loadComponent: () => import('./pages/error-page/error-page.component').then((m) => m.ErrorPageComponent) },
  { path: '404', loadComponent: () => import('./pages/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent) },
  { path: '**', redirectTo: '/404' },
];
