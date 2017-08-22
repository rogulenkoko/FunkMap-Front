import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioMapComponent } from './studio-map.component';

describe('StudioMapComponent', () => {
  let component: StudioMapComponent;
  let fixture: ComponentFixture<StudioMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
