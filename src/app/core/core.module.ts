import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  providers: [AuthRedirectGuard, AuthGuard],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule should only be imported in AppModule');
    }
  }
}
