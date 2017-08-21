import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandFullComponent } from './band-full.component';

describe('BandFullComponent', () => {
  let component: BandFullComponent;
  let fixture: ComponentFixture<BandFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
