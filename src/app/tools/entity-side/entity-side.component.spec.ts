import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySideComponent } from './entity-side.component';

describe('EntitySideComponent', () => {
  let component: EntitySideComponent;
  let fixture: ComponentFixture<EntitySideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitySideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitySideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
