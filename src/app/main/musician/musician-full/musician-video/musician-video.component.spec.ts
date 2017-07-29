import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicianVideoComponent } from './musician-video.component';

describe('MusicianVideoComponent', () => {
  let component: MusicianVideoComponent;
  let fixture: ComponentFixture<MusicianVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicianVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
