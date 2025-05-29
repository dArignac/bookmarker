import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UuidRouteGuard implements CanActivate {
  router = inject(Router);

  // Regex for UUID v4
  private uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const profileId = route.paramMap.get('profileId');

    if (profileId && this.uuidRegex.test(profileId)) {
      return true;
    }

    return this.router.createUrlTree(['/404']);
  }
}
