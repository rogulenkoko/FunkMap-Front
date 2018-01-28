import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatComponent } from './donat.component';

describe('DonatComponent', () => {
  let component: DonatComponent;
  let fixture: ComponentFixture<DonatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
