import { TestBed, inject } from '@angular/core/testing';

import { EntityTypeProvider } from './entity-type-provider.service';

describe('EntityTypeProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntityTypeProvider]
    });
  });

  it('should ...', inject([EntityTypeProvider], (service: EntityTypeProvider) => {
    expect(service).toBeTruthy();
  }));
});
