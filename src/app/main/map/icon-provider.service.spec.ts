import { TestBed, inject } from '@angular/core/testing';

import { IconProvider } from './icon-provider.service';

describe('IconProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IconProvider]
    });
  });

  it('should ...', inject([IconProvider], (service: IconProvider) => {
    expect(service).toBeTruthy();
  }));
});
