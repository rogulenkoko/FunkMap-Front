import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityVideoComponent } from './entity-video.component';

describe('EntityVideoComponent', () => {
  let component: EntityVideoComponent;
  let fixture: ComponentFixture<EntityVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
