import { Routes } from '@angular/router';
import { authRedirectGuard } from '@core/guards/auth-redirect.guard';
import { authGuard } from '@core/guards/auth.guard';
import { UserResolver } from '@core/user.resolver';
import { DashboardComponent } from '@features/landing-pages/components/dashboard/dashboard.component';
import { HomeComponent } from '@features/landing-pages/components/home/home.component';
import { PlaceholderComponent } from '@features/landing-pages/components/placeholder/placeholder.component';
import { ProfilesResolver } from '@features/profiles/profiles.resolver';
import { TagsComponent } from '@features/tags/tags.component';
import { AppShellComponent } from '@layout/app-shell/app-shell.component';

export const routes: Routes = [
  // Redirect root path to home (or dashboard)
  {
    path: '',
    pathMatch: 'full',
    canActivate: [authRedirectGuard],
    component: PlaceholderComponent, // Used only for redirect logic
  },

  // Public routes (no layout shell)
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'error',
    loadComponent: () => import('./pages/error-page/error-page.component').then((m) => m.ErrorPageComponent),
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },

  // Protected layout shell
  {
    path: '',
    component: AppShellComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
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
        resolve: {
          user: UserResolver,
        },
      },
    ],
  },

  // Fallback
  {
    path: '**',
    redirectTo: '/404',
  },
];
