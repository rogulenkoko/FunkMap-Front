import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEntitiesComponent } from './user-entities.component';

describe('UserEntitiesComponent', () => {
  let component: UserEntitiesComponent;
  let fixture: ComponentFixture<UserEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
