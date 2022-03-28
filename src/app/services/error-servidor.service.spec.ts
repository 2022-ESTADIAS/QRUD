import { TestBed } from '@angular/core/testing';

import { ErrorServidorService } from './error-servidor.service';

describe('ErrorServidorService', () => {
  let service: ErrorServidorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorServidorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
