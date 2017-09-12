import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandInviteNotificationComponent } from './band-invite-notification.component';

describe('BandInviteNotificationComponent', () => {
  let component: BandInviteNotificationComponent;
  let fixture: ComponentFixture<BandInviteNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandInviteNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandInviteNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
