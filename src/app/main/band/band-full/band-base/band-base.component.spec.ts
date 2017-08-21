import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandBaseComponent } from './band-base.component';

describe('BandBaseComponent', () => {
  let component: BandBaseComponent;
  let fixture: ComponentFixture<BandBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
