import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityActiveComponent } from './entity-active.component';

describe('EntityActiveComponent', () => {
  let component: EntityActiveComponent;
  let fixture: ComponentFixture<EntityActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
