import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RehearsalBaseComponent } from './rehearsal-base.component';

describe('RehearsalBaseComponent', () => {
  let component: RehearsalBaseComponent;
  let fixture: ComponentFixture<RehearsalBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehearsalBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehearsalBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
