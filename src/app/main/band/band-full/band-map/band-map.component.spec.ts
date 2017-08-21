import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandMapComponent } from './band-map.component';

describe('BandMapComponent', () => {
  let component: BandMapComponent;
  let fixture: ComponentFixture<BandMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
