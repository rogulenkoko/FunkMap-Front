import { TestBed, inject } from '@angular/core/testing';

import { VideoApiService } from './video-api.service';

describe('VideoApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoApiService]
    });
  });

  it('should ...', inject([VideoApiService], (service: VideoApiService) => {
    expect(service).toBeTruthy();
  }));
});
