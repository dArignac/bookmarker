import { EnvironmentInjector, Injector, runInInjectionContext } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SupabaseService } from '@core/services/supabase/supabase.service';
import { AuthError, UserResponse } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { authGuard } from './auth.guard';

let rootInjector: EnvironmentInjector;

describe('authGuard', () => {
  let mockSupabaseService: Partial<SupabaseService>;
  let mockRouter: Partial<Router>;

  const dummyRoute = {} as ActivatedRouteSnapshot;
  const dummyState = {} as RouterStateSnapshot;

  beforeAll(() => {
    mockSupabaseService = {
      getUser: vi.fn(),
    };

    mockRouter = {
      navigate: vi.fn(),
    };

    rootInjector = Injector.create({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SupabaseService, useValue: mockSupabaseService },
      ],
    }) as EnvironmentInjector;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should activate when user is authenticated', async () => {
    // Arrange
    mockSupabaseService.getUser = vi.fn(() => Promise.resolve({ data: { user: { id: '123' } }, error: null } as UserResponse));

    // Act
    const guardResponse = runInInjectionContext(rootInjector, () => {
      return authGuard(dummyRoute, dummyState) as Observable<boolean>;
    });

    // Assert
    const result = await new Promise<boolean>((resolve) => {
      guardResponse.subscribe(resolve);
    });

    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to /login when user is not authenticated', async () => {
    // Arrange
    mockSupabaseService.getUser = vi.fn(() => Promise.resolve({ data: { user: null }, error: new AuthError('Login failed') } as UserResponse));

    // Act
    const guardResponse = runInInjectionContext(rootInjector, () => {
      return authGuard(dummyRoute, dummyState) as Observable<boolean>;
    });

    // Assert
    const result = await new Promise<boolean>((resolve) => {
      guardResponse.subscribe(resolve);
    });

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
