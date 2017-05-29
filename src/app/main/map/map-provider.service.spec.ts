import { TestBed, inject } from '@angular/core/testing';

import { MapProvider } from './map-provider.service';

describe('MapProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapProvider]
    });
  });

  it('should ...', inject([MapProvider], (service: MapProvider) => {
    expect(service).toBeTruthy();
  }));
});
