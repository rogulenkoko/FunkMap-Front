import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCreationComponent } from './map-creation.component';

describe('MapCreationComponent', () => {
  let component: MapCreationComponent;
  let fixture: ComponentFixture<MapCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
