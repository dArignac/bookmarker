import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { ProfilesResolver } from './features/profiles/profiles.resolver';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginRequiredComponent } from './login-required/login-required.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
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
  { path: 'login', component: LoginComponent },
  { path: 'not-logged-in', component: LoginRequiredComponent },
  { path: 'error', component: ErrorComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
