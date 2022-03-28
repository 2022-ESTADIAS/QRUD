import { TestBed } from '@angular/core/testing';

import { ErrorServidorGuard } from './error-servidor.guard';

describe('ErrorServidorGuard', () => {
  let guard: ErrorServidorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ErrorServidorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
