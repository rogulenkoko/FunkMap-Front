import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RehearsalMapComponent } from './rehearsal-map.component';

describe('RehearsalMapComponent', () => {
  let component: RehearsalMapComponent;
  let fixture: ComponentFixture<RehearsalMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehearsalMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehearsalMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
