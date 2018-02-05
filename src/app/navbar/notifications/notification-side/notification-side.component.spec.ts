import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSideComponent } from './notification-side.component';

describe('NotificationSideComponent', () => {
  let component: NotificationSideComponent;
  let fixture: ComponentFixture<NotificationSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
