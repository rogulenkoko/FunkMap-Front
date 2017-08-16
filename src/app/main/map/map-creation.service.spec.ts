import { TestBed, inject } from '@angular/core/testing';

import { MapCreationService } from './map-creation.service';

describe('MapCreationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapCreationService]
    });
  });

  it('should ...', inject([MapCreationService], (service: MapCreationService) => {
    expect(service).toBeTruthy();
  }));
});
