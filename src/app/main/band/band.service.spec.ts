import { TestBed, inject } from '@angular/core/testing';

import { BandService } from './band.service';

describe('BandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BandService]
    });
  });

  it('should ...', inject([BandService], (service: BandService) => {
    expect(service).toBeTruthy();
  }));
});
