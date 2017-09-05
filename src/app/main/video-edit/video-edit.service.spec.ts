import { TestBed, inject } from '@angular/core/testing';

import { VideoEditService } from './video-edit.service';

describe('VideoEditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoEditService]
    });
  });

  it('should ...', inject([VideoEditService], (service: VideoEditService) => {
    expect(service).toBeTruthy();
  }));
});
