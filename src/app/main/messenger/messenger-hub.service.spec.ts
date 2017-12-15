import { TestBed, inject } from '@angular/core/testing';

import { MessengerHubService } from './messenger-hub.service';

describe('MessengerHubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessengerHubService]
    });
  });

  it('should ...', inject([MessengerHubService], (service: MessengerHubService) => {
    expect(service).toBeTruthy();
  }));
});
