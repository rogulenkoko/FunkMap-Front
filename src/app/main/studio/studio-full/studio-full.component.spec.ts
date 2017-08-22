import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioFullComponent } from './studio-full.component';

describe('StudioFullComponent', () => {
  let component: StudioFullComponent;
  let fixture: ComponentFixture<StudioFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
