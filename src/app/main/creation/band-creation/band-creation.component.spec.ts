import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandCreationComponent } from './band-creation.component';

describe('BandCreationComponent', () => {
  let component: BandCreationComponent;
  let fixture: ComponentFixture<BandCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
