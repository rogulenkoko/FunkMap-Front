import { TestBed, inject } from '@angular/core/testing';

import { RehearsalService } from './rehearsal.service';

describe('RehearsalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RehearsalService]
    });
  });

  it('should ...', inject([RehearsalService], (service: RehearsalService) => {
    expect(service).toBeTruthy();
  }));
});
