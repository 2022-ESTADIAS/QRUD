import { TestBed } from '@angular/core/testing';

import { QRUDService } from './qrud.service';

describe('QRUDService', () => {
  let service: QRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
