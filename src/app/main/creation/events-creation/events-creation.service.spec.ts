import { TestBed, inject } from '@angular/core/testing';

import { EventsCreationService } from './events-creation.service';

describe('EventsCreationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsCreationService]
    });
  });

  it('should be created', inject([EventsCreationService], (service: EventsCreationService) => {
    expect(service).toBeTruthy();
  }));
});
