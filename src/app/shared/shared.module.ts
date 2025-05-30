import { NgModule, Optional, SkipSelf } from '@angular/core';
import { UuidRouteGuard } from './guards/uuid-route.guard';

@NgModule({
  providers: [UuidRouteGuard],
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) {
      throw new Error('SharedModule should only be imported in AppModule');
    }
  }
}
