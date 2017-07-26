import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicianMapComponent } from './musician-map.component';

describe('MusicianMapComponent', () => {
  let component: MusicianMapComponent;
  let fixture: ComponentFixture<MusicianMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicianMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
