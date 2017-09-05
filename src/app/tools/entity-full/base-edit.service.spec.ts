import { TestBed, inject } from '@angular/core/testing';
import { BaseEditService } from "app/main/avatar/base-edit.service";


describe('AvatarBaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseEditService]
    });
  });

  it('should ...', inject([BaseEditService], (service: BaseEditService) => {
    expect(service).toBeTruthy();
  }));
});
