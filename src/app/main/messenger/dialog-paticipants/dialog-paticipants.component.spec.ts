import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaticipantsComponent } from './dialog-paticipants.component';

describe('DialogPaticipantsComponent', () => {
  let component: DialogPaticipantsComponent;
  let fixture: ComponentFixture<DialogPaticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPaticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPaticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
