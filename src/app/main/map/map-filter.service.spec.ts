import { TestBed, inject } from '@angular/core/testing';

import { MapFilter } from './map-filter.service';

describe('MapFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapFilter]
    });
  });

  it('should ...', inject([MapFilter], (service: MapFilter) => {
    expect(service).toBeTruthy();
  }));
});
