import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNameEditComponent } from './dialog-name-edit.component';

describe('DialogNameEditComponent', () => {
  let component: DialogNameEditComponent;
  let fixture: ComponentFixture<DialogNameEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNameEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
