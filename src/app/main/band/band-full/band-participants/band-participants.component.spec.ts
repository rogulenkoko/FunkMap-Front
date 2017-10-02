import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandParticipantsComponent } from './band-participants.component';

describe('BandParticipantsComponent', () => {
  let component: BandParticipantsComponent;
  let fixture: ComponentFixture<BandParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
