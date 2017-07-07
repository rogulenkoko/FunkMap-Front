import { TestBed, inject } from '@angular/core/testing';

import { SearchFilterService } from './search-filter.service';

describe('SearchFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchFilterService]
    });
  });

  it('should ...', inject([SearchFilterService], (service: SearchFilterService) => {
    expect(service).toBeTruthy();
  }));
});
