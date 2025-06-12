import { EnvironmentInjector, Injector, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { SupabaseService } from './supabase.service';

// Mocks
const mockRouter = { navigate: vi.fn() };

// Mock SupabaseClient
const mockSupabaseClient = {
  auth: {
    signInWithPassword: vi.fn(() => Promise.resolve({ data: { session: 'session', user: 'user' }, error: null })),
    signOut: vi.fn(() => Promise.resolve({ error: null })),
    getUser: vi.fn(() => Promise.resolve({ data: { user: { id: '1', email: 'test@example.com' } }, error: null })),
    // FIXME needs to handle session changes
    onAuthStateChange: vi.fn(),
  },
};

const mockSupabaseClientErroneous = {
  auth: {
    signInWithPassword: vi.fn(() => Promise.resolve({ data: null, error: 'Login failed' })),
  },
};

vi.mock('@angular/router', () => ({ Router: vi.fn(() => mockRouter) }));

// Get a root injector
let rootInjector: EnvironmentInjector;

// Test suite
describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeAll(() => {
    // Minimal root injector
    rootInjector = Injector.create({
      providers: [{ provide: Router, useValue: mockRouter }],
    }) as EnvironmentInjector;
  });

  beforeEach(() => {
    service = runInInjectionContext(rootInjector, () => new SupabaseService());
    // @ts-ignore: private
    service.supabase = mockSupabaseClient as any;
  });

  it('should login with email and password', async () => {
    await service.loginWithEmail('test@example.com', 'password');
    expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
    expect(service._session).toBe('session');
    expect(service._user).toBe('user');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should log an error if login fails', async () => {
    // Arrange
    // @ts-ignore: private
    service.supabase = mockSupabaseClientErroneous as any;
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Act
    await service.loginWithEmail('test@example.com', 'password');

    // Assert
    expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
    expect(errorSpy).toHaveBeenCalledWith('Login failed');
    expect(service._session).toBeNull();
    expect(service._user).toBeNull();

    errorSpy.mockRestore();
  });

  it('should logout and reset state', async () => {
    service._session = 'session' as any;
    service._user = 'user' as any;
    await service.logout();
    expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled();
    expect(service._session).toBeNull();
    expect(service._user).toBeNull();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should get user', async () => {
    const result = await service.getUser();
    expect(mockSupabaseClient.auth.getUser).toHaveBeenCalled();
    expect(result.data.user).toEqual({ id: '1', email: 'test@example.com' });
  });
});
