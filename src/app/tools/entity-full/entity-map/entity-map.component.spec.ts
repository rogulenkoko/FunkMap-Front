import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityMapComponent } from './entity-map.component';

describe('EntityMapComponent', () => {
  let component: EntityMapComponent;
  let fixture: ComponentFixture<EntityMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
