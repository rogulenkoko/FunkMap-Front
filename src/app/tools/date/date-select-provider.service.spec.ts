import { TestBed, inject } from '@angular/core/testing';

import { DateSelectProvider } from './date-select-provider.service';

describe('DateSelectProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateSelectProvider]
    });
  });

  it('should ...', inject([DateSelectProvider], (service: DateSelectProvider) => {
    expect(service).toBeTruthy();
  }));
});
