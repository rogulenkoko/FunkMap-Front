import { TestBed, inject } from '@angular/core/testing';

import { ConnectionResolver } from './connection-resolver.service';

describe('ConnectionResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectionResolver]
    });
  });

  it('should ...', inject([ConnectionResolver], (service: ConnectionResolver) => {
    expect(service).toBeTruthy();
  }));
});
