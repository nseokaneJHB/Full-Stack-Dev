import { TestBed } from '@angular/core/testing';

import { ProtectLoginRegisterGuard } from './protect-login-register.guard';

describe('ProtectLoginRegisterGuard', () => {
  let guard: ProtectLoginRegisterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtectLoginRegisterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
