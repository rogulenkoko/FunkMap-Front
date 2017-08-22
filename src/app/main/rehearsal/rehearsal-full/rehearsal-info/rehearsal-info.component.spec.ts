import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RehearsalInfoComponent } from './rehearsal-info.component';

describe('RehearsalInfoComponent', () => {
  let component: RehearsalInfoComponent;
  let fixture: ComponentFixture<RehearsalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehearsalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehearsalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
