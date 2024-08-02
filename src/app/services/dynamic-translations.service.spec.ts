import { TestBed } from '@angular/core/testing';

import { DynamicTranslationsService } from './dynamic-translations.service';

describe('DynamicTranslationsService', () => {
  let service: DynamicTranslationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicTranslationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
