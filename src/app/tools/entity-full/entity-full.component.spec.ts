import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFullComponent } from './entity-full.component';

describe('EntityFullComponent', () => {
  let component: EntityFullComponent;
  let fixture: ComponentFixture<EntityFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
