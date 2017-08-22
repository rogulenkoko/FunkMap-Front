import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioBaseComponent } from './studio-base.component';

describe('StudioBaseComponent', () => {
  let component: StudioBaseComponent;
  let fixture: ComponentFixture<StudioBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
