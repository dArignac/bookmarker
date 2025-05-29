import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { uuidRouteGuard } from './uuid-route.guard';

describe('uuidRouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => uuidRouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
