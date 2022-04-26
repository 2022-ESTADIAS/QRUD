import { TestBed } from '@angular/core/testing';

import { ActivoGuard } from './activo.guard';

describe('ActivoGuard', () => {
  let guard: ActivoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActivoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
