import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandVideoComponent } from './band-video.component';

describe('BandVideoComponent', () => {
  let component: BandVideoComponent;
  let fixture: ComponentFixture<BandVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
