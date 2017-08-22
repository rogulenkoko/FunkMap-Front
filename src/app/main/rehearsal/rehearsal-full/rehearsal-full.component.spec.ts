import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RehearsalFullComponent } from './rehearsal-full.component';

describe('RehearsalFullComponent', () => {
  let component: RehearsalFullComponent;
  let fixture: ComponentFixture<RehearsalFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehearsalFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehearsalFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
