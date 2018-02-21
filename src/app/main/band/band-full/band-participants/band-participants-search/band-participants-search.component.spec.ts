import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandParticipantsSearchComponent } from './band-participants-search.component';

describe('BandParticipantsSearchComponent', () => {
  let component: BandParticipantsSearchComponent;
  let fixture: ComponentFixture<BandParticipantsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandParticipantsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandParticipantsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
