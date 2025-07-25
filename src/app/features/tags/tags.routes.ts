import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { UserResolver } from '@core/user.resolver';
import { TagsPageComponent } from './pages/tags-page/tags-page.component';
import { TagsResolver } from './tags.resolver';

export const routes: Routes = [
  {
    path: '',
    component: TagsPageComponent,
    canActivate: [authGuard],
    resolve: {
      user: UserResolver,
      tags: TagsResolver,
    },
  },
];
