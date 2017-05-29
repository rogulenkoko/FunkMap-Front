import { TestBed, inject } from '@angular/core/testing';

import { MarkerFactory } from './marker-factory.service';

describe('MarkerFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkerFactory]
    });
  });

  it('should ...', inject([MarkerFactory], (service: MarkerFactory) => {
    expect(service).toBeTruthy();
  }));
});
