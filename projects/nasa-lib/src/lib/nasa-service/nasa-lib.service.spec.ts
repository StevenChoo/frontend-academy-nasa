import { TestBed } from '@angular/core/testing';

import { NasaLibService } from './nasa-lib.service';

describe('NasaLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NasaLibService = TestBed.get(NasaLibService);
    expect(service).toBeTruthy();
  });
});
