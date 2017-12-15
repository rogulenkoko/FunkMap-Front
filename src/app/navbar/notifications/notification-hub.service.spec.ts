import { TestBed, inject } from '@angular/core/testing';

import { NotificationHubService } from './notification-hub.service';

describe('NotificationHubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationHubService]
    });
  });

  it('should ...', inject([NotificationHubService], (service: NotificationHubService) => {
    expect(service).toBeTruthy();
  }));
});
