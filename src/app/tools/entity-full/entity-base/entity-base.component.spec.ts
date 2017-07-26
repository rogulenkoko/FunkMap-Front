import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityBaseComponent } from './entity-base.component';

describe('EntityBaseComponent', () => {
  let component: EntityBaseComponent;
  let fixture: ComponentFixture<EntityBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
