import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioInfoComponent } from './studio-info.component';

describe('StudioInfoComponent', () => {
  let component: StudioInfoComponent;
  let fixture: ComponentFixture<StudioInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
