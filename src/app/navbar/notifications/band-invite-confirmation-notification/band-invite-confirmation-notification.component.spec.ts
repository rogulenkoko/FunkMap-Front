import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandInviteConfirmationNotificationComponent } from './band-invite-confirmation-notification.component';

describe('BandInviteConfirmationNotificationComponent', () => {
  let component: BandInviteConfirmationNotificationComponent;
  let fixture: ComponentFixture<BandInviteConfirmationNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandInviteConfirmationNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandInviteConfirmationNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
