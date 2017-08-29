import { TestBed, inject } from '@angular/core/testing';

import { AvatarBaseService } from './avatar-base.service';

describe('AvatarBaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvatarBaseService]
    });
  });

  it('should ...', inject([AvatarBaseService], (service: AvatarBaseService) => {
    expect(service).toBeTruthy();
  }));
});
