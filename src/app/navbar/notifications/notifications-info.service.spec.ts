import { TestBed, inject } from '@angular/core/testing';

import { NotificationsInfoService } from './notifications-info.service';

describe('NotificationsInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationsInfoService]
    });
  });

  it('should ...', inject([NotificationsInfoService], (service: NotificationsInfoService) => {
    expect(service).toBeTruthy();
  }));
});
